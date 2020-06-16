import axios from 'axios';

const API_URL = `http://localhost:5000/users/`
// const SIGNUP_URL = "http://localhost:3000/users/auth/signup"

const authHeader=()=>{
    const user= JSON.parse(localStorage.getItem('user'))
    
    if(user && user.accessToken){
        return {'x-access-token': user.accessToken}
    }
    return {}
}
//'content-type': "multipart/form-data; boundary='image_path'"
console.log(API_URL)
function AuthService ()  {
  return ({
    login: (email, password)=> {
      return axios
        .post(API_URL + "signin", {
          email,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }

          return response.data;
        });
    },

    logout: ()=>{
      localStorage.removeItem("user");
    },

    getCurrentUser: () =>{
      return JSON.parse(localStorage.getItem('user'));;
    },

    register: (role, email, password, name, username,address,phones,image_path,city,area,street) => {
      let form = new FormData();
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      form.append('name', name);
      form.append('role', role);
      form.append('street', street);
      form.append('city', city);
      form.append('area', area);
      form.append('username', username);
      form.append('email', email);
      form.append('password', password);
      form.append('image_path', image_path);
      form.append('address', address);
      form.append('phones', phones);
      return (
        axios.post(API_URL+"register", form, config)
      )
    },

    update: (email, password, name, username, image_path,address,phones) => {
      let config = {
        headers: authHeader()
      }
      config['content-type'] = 'multipart/form-data';
      let form = new FormData();
      if(name) form.append('name', name);
      if(username) form.append('username', username);
      if(email) form.append('email', email);
      if(password) form.append('password', password);
      if(image_path) form.append('image_path', image_path);
      if(address) form.append('address', address);
      if(phones) form.append('phones', phones);
      return (
        axios.patch(API_URL+"update", form, config)
      )
    }
  })
}
export default new AuthService();
