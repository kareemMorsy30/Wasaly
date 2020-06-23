import React, { useState, useEffect, Fragment } from 'react';
import { useInput } from './hooks/input-hooks';
import axios from 'axios';
import './Auth.css';
// import '../../styles/form.scss'
import { Link, useHistory } from "react-router-dom";
import {
    Button,
    Form,
    FormGroup,
    Input, FormText,
    Label,
} from 'reactstrap';
import { getGeoLocation } from '../../endpoints/geocoding';
import { authHeader } from '../config/config'
import { ToastContainer, toast } from 'react-toastify';

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;

const Authentication = (props) => {
    const history = useHistory();
    const [errorsRegister, setErrorsRegister] = useState("");
    const { value: usernameRegister, bind: bindUsernameRegister, reset: resetUsernameRegister } = useInput('');
    const { value: passwordRegister, bind: bindPasswordRegister, reset: resetPasswordRegister } = useInput('');
    const { value: passConfRegister, bind: bindPassConfRegister, reset: resetPassConfRegister } = useInput('');
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
    const { value: name, bind: bindname, reset: resetname } = useInput('');
    const { value: role, bind: bindrole, reset: resetrole } = useInput('customer');
    /**
    * Product owner
    */
    const { value: marketName, bind: bindMn, reset: resetMn } = useInput('');
    const { value: marketPhone, bind: bindMp, reset: resetMp } = useInput('');
    const { value: ownerName, bind: bindOn, reset: resetOn } = useInput('');
    /**
     * Service Owner
     */
    const { value: distance, bind: bindD, reset: resetD } = useInput(0);
    const { value: region, bind: bindR, reset: resetR } = useInput(0);
    const { value: transportation, bind: bindT, reset: resetT } = useInput('');
    const [city, setcity] = useState('');
    const [area, setarea] = useState('');
    const [street, setstreet] = useState('');
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    // const [phone, setphone] = useState('');
    const registerUrl = `${domain}/users/register`;
    const avatarUrl = `${domain}/users/profile/avatar`;
    const [address, setInputFields] = useState([ ]);
    const [phones, setphones] = useState([])
   
  

    const removePhone = (id) => {
        return (e) => {
            setphones(phones.filter((phone, index) => {
                return index !== id
            }))
        }
    }






    const handleChangePhone = (id) => {
        return (e) => {
            const { target: { value } } = e
            setphones(phones.map((phone, index) => {
                if (id === index) {
                    phone = value
                }
                return phone
            }))
        }
    }
    const [error, seterror] = useState();
    const [avatarInput, setAvatarInput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleAvatarChange = e => {
        setAvatarInput(e.target.files[0]);
        console.log(e.target.files[0]);

    };

        

  
    const handleAddFields = () => {
        const values = [...address];
        values.push({ street: '', city: '', area: '', location: { latitude, longitude } });
        setInputFields(values);
    };
    const handleRemoveFields = index => {
        const values = [...address];
        values.splice(index, 1);
        setInputFields(values);
    };
    const [suggested, setSuggested] = useState([]);

    const handleInputChange = (index, event) => {
        /**
         * address is same as values so it dosn;t make sense 
         */
        const values = [...address];
        console.log('====================================');
        console.log("address ::   ", address);
        console.log('====================================');
        console.log('====================================');
        console.log("Values", values);
        console.log('====================================');
        if (event.target.name === "street") {
            values[index].street = event.target.value;
        } else if (event.target.name === "city") {
            values[index].city = event.target.value;
        }
        else if (event.target.name === "area") {
            values[index].area = event.target.value;
        }
        else {
            values[index].location.latitude = event.target.value;
            values[index].location.longitude = event.target.value;
        }
        console.log('====================================');
        console.log("setInputFields", setInputFields);
        console.log('====================================');
        setInputFields(values);
        // const input = event.target.value;
        // if (input.length >= 3 && input[input.length - 1] !== ' ') {


        //     getGeoLocation(input).then(data => {
        //         console.log('====================================');
        //         console.log("DATAAA ", data);
        //         console.log("DATAAA ", data.fullArea);
        //         console.log('====================================');
        //         // address.map((address)=>{
        //         if (data.area) setInputFields({
        //             ...address,
        //             area: data.fullArea,
        //             city: data.city,
        //             longitude: data.longitude,
        //             latitude: data.latitude,
        //         });

        //         if (data.area && !suggested.includes(data.area && data.area.toLowerCase().includes(input))) {
        //             setSuggested([...suggested, data.area]);
        //             // console.log('====================================');
        //             // console.log("DATAAA ", data.area);
        //             // console.log("DATAAA ", data.fullArea);
        //             setcity(data.city);
        //             setarea(data.fullArea);
        //             setlatitude(data.latitude);
        //             setlongitude(data.longitude);
        //             // setstreet()
        //             console.log('=======================inside suggest=============');
        //             // setInputFields([{ street: address.street, area: data.fullArea, city: data.city, location: { latitude: data.latitude, longitude: data.longitude } }]);
        //             console.log('====================================');
        //             console.log(address);
        //             console.log('====================================');
        //         }
        //     })
        //     // })
        // }
        // else {
        //     console.log('====================================');
        //     console.log("A7a fe aeh");
        //     console.log('====================================');
        // }

    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (avatarInput) {
            if (
                !['image/gif', 'image/jpeg', 'image/png'].includes(avatarInput.type)
            ) {
                // setErrors(['image is not valid ']);
                return;
            } else if (avatarInput.size > 3e6) {
                // setErrors(['image is too large']);
                return;
            }
        }
        try {
            if (passwordRegister === passConfRegister && role === "customer") {

                const registerResult = await axios.post(registerUrl,

                    {

                        username: usernameRegister,

                        password: passwordRegister,

                        email,

                        name,

                        phones,

                        role,

                        address,
                    }, {
                    withCredentials: true,

                })


                    .then((response) => {
                        console.log('====================================');
                        console.log("response then ",response);
                        console.log('====================================');
                        // console.log(response.data.user._id);
                        let userId = response.data.user._id
                        if (avatarInput) {
                            const formData = new FormData();
                            formData.append('avatar', avatarInput);
                            axios.post(`${avatarUrl}/${userId}`, formData, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`,

                                    'content-type': 'multipart/form-data',
                                }


                            });
                        }
                        if (response.status=250) {
                            setErrorsRegister(response.data.message)

                            toast(errorsRegister)

console.log("response",response);
                            

                        } else if (response.status == 200) {

                            console.log("good");

                            //Should logged in first by history.push what is the route ?

                            history.push("/");

                            // window.location = "http://localhost:3000/home";

                        }

                    },
                    
                    
                    (error) => {
                        console.log('====================================');
                        console.log(error.message,"ERRROR");
                        console.log(error);
                        
                        
                        console.log('====================================');
                            error.message=" Email address  is already taken";
                          seterror(error.message)
                          toast(error.message)
                      }
                      )

            }


                // axios.post(avatarUrl,authHeader);

            

            if (passwordRegister === passConfRegister && role === "productowner") {
// set
                const registerResult = await axios.post(registerUrl,

                    {
                        username: usernameRegister,

                        password: passwordRegister,

                        email,

                        name,

                        phones,

                        role,

                        address,
                        marketName, marketPhone, ownerName
                        // image_path:data

                    }, {

                    withCredentials: true,

                }).then( (response) => {

                    console.log('====================================');
                    console.log(response.data.productOwner.user);
                    console.log('====================================');
                    console.log(response.data.productOwner.user.toString());
                    let userId = response.data.productOwner.user.toString();
                    if (avatarInput) {
                        const formData = new FormData();
                        formData.append('avatar', avatarInput);
                        axios.post(`${avatarUrl}/${userId}`, formData, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,

                                'content-type': 'multipart/form-data',
                            }


                        });
                    }

                    if (response.status == 250) {

                        // setErrorsRegister(response.message)

                    } else if (response.status == 200) {

                        console.log("good");

                        //Should logged in first by history.push what is the route ?

                        history.push("/");

                        // window.location = "http://localhost:3000/home";

                    }

                },     
                (error) => {
                    console.log('====================================');
                    console.log(error.message,"ERRROserR");
                    console.log(error);
                    
                    
                    console.log('====================================');
                        error.message=" Email address is already taken";
                      seterror(error.message)
                      toast(error.message)
                  }
                
                )

            }
            if (passwordRegister === passConfRegister && role === "serviceowner") {

                const registerResult = await axios.post(registerUrl,

                    {
                        username: usernameRegister,

                        password: passwordRegister,

                        email,

                        name,

                        phones,

                        role,

                        address,
                        distance, region, transportation

                        // image_path:data

                    }, {

                    withCredentials: true,

                }).then((response) => {
                    console.log('====================================');
                    console.log(response);
                    console.log('====================================');
                    console.log(response.data.serviceOwner.user.toString());
                    let userId = response.data.serviceOwner.user.toString()
                    if (avatarInput) {
                        const formData = new FormData();
                        formData.append('avatar', avatarInput);
                        axios.post(`${avatarUrl}/${userId}`, formData, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,

                                'content-type': 'multipart/form-data',
                            }


                        });
                    }


                    if (response.status == 250) {

                        // setErrorsRegister(response.message)

                    } else if (response.status == 200) {

                        console.log("good");

                        //Should logged in first by history.push what is the route ?

                        history.push("/");

                        // window.location = "http://localhost:3000/home";

                    }

                },    
                (error) => {
                    console.log('====================================');
                    console.log(error.message,"ERRROserR");
                    console.log(error);
                    
                    
                    console.log('====================================');
                        error.message=" Email address is already taken";
                      seterror(error.message)
                      toast(error.message)
                  }
                
                
                
                )

            }

        }
        catch (error) {
            setIsLoading(false);
            console.log(error);

            // setErrors([error.response.message]);
        }
    }


    return (

        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 ' style={{ margin: 'auto', marginTop: '39px' }}>
 <div>
      {
        error?
        <ToastContainer/>:null}
    </div>
            <h4>Dont Have an Account ? Create one</h4>

            <hr />

            <Form onSubmit={handleRegisterSubmit}  
//             style={
//                 {
//   width: 98% !important;
//   display: inline-block !important;
// }
  
//   } 
            >

            <FormGroup>
            <p className="class1" style={{color: '#c8c0d5'}}> Choose Your Account :</p>

<Input type="select" name="role" id="exampleSelect"

    {...bindrole}

>
    <option>customer</option>

    <option>serviceowner</option>



    <option>productowner</option>

</Input>


</FormGroup>

                <FormGroup>

                    <Input type="text" name="name" placeholder="name"

                        pattern='[A-Za-z\\s]*'

                        {...bindname}

                    />*

                </FormGroup>
             
                <FormGroup>

                    <Input type="text" name="username" placeholder="Username"
required
                        pattern='[A-Za-z\\s]*'

                        {...bindUsernameRegister}

                    />

                </FormGroup>

                <FormGroup>

                    <Input type="email" name="email" placeholder="E-mail"

                        {...bindEmail}

                    />

                </FormGroup>


            
                <FormGroup>
                    <Input type="password" name="password" placeholder="password "
                        {...bindPasswordRegister}
                    />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" placeholder="passwordConfirmation"
                        {...bindPassConfRegister}
                    />
                </FormGroup>


                {role === "productowner" ?

                    <FormGroup>
                        <Label >productowner</Label>


                        <Input type="text" name="marketName" placeholder="marketName"

                            {...bindMn}

                        />
                        <Input type="text" name="marketPhone" placeholder="marketPhone"

                            {...bindMp}

                        />
                        <Input type="text" name="ownerName" placeholder="ownerName"

                            {...bindOn}

                        />
                    </FormGroup>
                    : null
                }

                {role === "serviceowner" ?

                    <FormGroup>
                        <Label >serviceowner</Label>


                        <Input type="number" name="distance" placeholder="distance"

                            {...bindD}

                        />
                        <Input type="number" name="region" placeholder="region"

                            {...bindR}

                        />
                        <Input type="text" name="transportation" placeholder="transportation"

                            {...bindT}

                        />
                    </FormGroup>
                    : null
                }
                <p className="class1" style={{color: '#c8c0d5'}}> Add Optional Information :</p>

                <FormGroup >
                    {phones.map((phone, index) => {
                        return (<div key={index}>
                        <Input className="form-input" placeholder="Phone" value={phone}
                            onChange={handleChangePhone(index)} />
                            
                            {
                                <button
                                   className="btn btn-link"
                                   type="button"
                                   onClick={removePhone(index)}
                               >
                                   Remove Phone
                                 </button>
                                                                
                                
                                }</div>
                                
                                
                                )
                    })}
                    {
                        // <Button size="sm" onClick={() => {
                        //     setphones(phones.concat([""]))
                        // }} >Add Phone</Button>
                        
                        <button
                        className="btn btn-link"
                        type="button"
                        style={{height: '1px', width : '110px',padding:"0px"}}

                        onClick={() =>  setphones(phones.concat([""]))}
                    >
                        Add Phone
                      </button>
                        }
                </FormGroup>

             
                {address.length>0 && address.map((inputField, index) => (
                    <Fragment key={`${inputField}~${index}`
                    }>
                        <FormGroup >
                            <Label for="exampleAddress">Address</Label>
                            <Input type="text" name="street" placeholder="street"
                                pattern='[A-Za-z\\s]*'
                                value={inputField.street}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <Input type="text" name="city" placeholder="city"
                                pattern='[A-Za-z\\s]*'
                                onChange={event => handleInputChange(index, event)}
                            />
                            <datalist id="from">
                                <option key="source" value={city} />
                            </datalist>
                            <Input type="text" name="area" placeholder="area"
                                pattern='[A-Za-z\\s]*'
                                // {...bindaddress}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <datalist id="from">
                                <option key="source" value={area} />
                            </datalist>
                            <Input type="number" name="latitude" placeholder="latitude"
                                onChange={event => handleInputChange(index, event)}
                            />
                            <Input type="number" name="longitude" placeholder="longitude"
                                onChange={event => handleInputChange(index, event)}
                            />

                        </FormGroup>

                        <div className="form-group col-sm-2">
                            <button
                                className="btn btn-link"
                                type="button"
                                onClick={() => handleRemoveFields(index)}
                            >
                                removeAddress
                </button>
                        
                        </div>
                    </Fragment>
                ))}

                    <button
                                className="btn btn-link"
                                type="button"
                                onClick={() => handleAddFields()}
                                style={{height: '1px', width : '110px',padding:"0px"}}

                            >
                                Add Address
                </button>

                <FormGroup >
                    <Input style={{ display: "block" }} type="file" name="files" onChange={handleAvatarChange}

                    />

                </FormGroup>
                <Button onSubmit={handleRegisterSubmit}> Sign up</Button>


            </Form>
            {errorsRegister ? <div className="errors-div">
                <small> {errorsRegister}</small>
            </div> : null}
        </div>
    )
}
export default Authentication