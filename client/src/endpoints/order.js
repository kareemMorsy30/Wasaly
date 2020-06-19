import axios from 'axios';

export const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;

export const getAvailableTransportations = () => {
    console.log(domain);
    const url = `${domain}/services/transportations`;
    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}

export const getAvailableServiceOwners = (order) => {
    const url = `${domain}/services/available/owners`;
    console.log(localStorage.getItem("token"));

    return axios.post(url, {
        ...order
    }, 
    {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}