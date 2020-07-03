
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
    FormFeedback,
} from 'reactstrap';
import { getGeoLocation } from '../../endpoints/geocoding';
import { authHeader } from '../config/config'
import { ToastContainer, toast } from 'react-toastify';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import ImageIcon from '@material-ui/icons/Image';

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;
const Authentication = (props) => {

    const history = useHistory();
    // const [errorsRegister, setErrorsRegister] = useState("");
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
    const { value: region, bind: bindR, reset: resetR } = useInput('');
    const { value: transportation, bind: bindT, reset: resetT } = useInput('');
    const [city, setcity] = useState('');
    const [area, setarea] = useState('');
    // const [street, setstreet] = useState('');
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    // const [phone, setphone] = useState('');
    const registerUrl = `${domain}/users/register`;
    const avatarUrl = `${domain}/users/profile/avatar`;
    const [toValue, setToValue] = useState('');
    const [Street, setStreet] = useState('')
    const [address, setAddress] = useState([{
        area: '',
        // street:street ,
        street: Street,
        city: '',
        location: {
            longitude: 0,
            latitude: 0
        }
    }]
    );
    const [addressFields, setInputFields] = useState([]);

    const [fromValue, setFromValue] = useState('');
    const [suggested, setSuggested] = useState([]);

    const [phones, setphones] = useState([])
    const [validate, setvalidate] = useState({})
    const [state, setState] = useState({ validate })
    const [errorsRegister, setErrorsRegister] = useState("");
    const [serviceObj, setServiceObj] = useState({ address: [] })


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
    const [error, seterror] = useState('');
    const [avatarInput, setAvatarInput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleAvatarChange = e => {
        setAvatarInput(e.target.files[0]);
        console.log(e.target.files[0]);

    };

const  handleStreet= (e)=>{
setStreet(e.target.value)
console.log(Street);

}


  
    const handlefromValueChange = (event) => {
        /**
         * address is same as values so it dosn;t make sense 
         */
     
        const input = event.target.value;
        setFromValue(event.target.value)
        if (input.length >= 3 && input[input.length - 1] !== ' ') {
            getGeoLocation(input).then(data => {
                console.log(data);
                console.log(data.area);

                if (data.area) setAddress([

                     {

                        area: data.fullArea,
                        city: data.city,

                        location: {
                            longitude: data.longitude,
                            latitude: data.latitude
                        }
                    }]


                );
               
                if (input > toValue && data.area && !suggested.includes(data.area) && data.area.toLowerCase().includes(input)) {
                    console.log('====================================');
                    console.log(data.area);
                    console.log('====================================');
                    setSuggested([...suggested, data.area]);
                    setFromValue(data.area);
                }
            })
        }

        

    };



    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('====================================');
        console.log(address);
        console.log('====================================');
        let addr = [{ ...address[0]} ]
        addr[0].street=Street;
        console.log('====================================');
        console.log(addr);
        console.log('====================================');
        if (avatarInput) {
            if (
                !['image/gif', 'image/jpeg', 'image/png'].includes(avatarInput.type)
            ) {
                // seterror('image is not valid ');
                return;
            } else if (avatarInput.size > 3e6) {
                // seterror('image is too large');
                // toast(error)
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

                        address:addr,
                    }, {
                    withCredentials: true,

                })


                    .then((response) => {
                        // setServiceObj(response.data);

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


                            }).then(res => {
                                // toast.success('upload success')
                            })
                                .catch(err => {
                                    // toast.error('upload fail')
                                });
                        }
                        if (response.status == 250) {
                            // setErrorsRegister(response.data.message)

                            // toast(errorsRegister)



                        } else if (response.status == 200) {

                            console.log("good");

                            //Should logged in first by history.push what is the route ?

                            history.push("/welcome");

                            // window.location = "http://localhost:3000/home";

                        }

                    },


                        (error) => {
                            console.log(error.message, "ERRROR");
                            console.log(error);


                            error.message = " Email address  is already taken";
                            // setErrorsRegister(error.message)

                            //   seterror(error.message)
                            //   toast(error.message)
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

                        address:addr,
                        marketName, marketPhone, ownerName
                        // image_path:data

                    }, {

                    withCredentials: true,

                }).then((response) => {
                    setServiceObj(response.data);

                    // setAddress(response.data);
                   
                    let userId = response.data.user._id.toString();
                    if (avatarInput) {
                        const formData = new FormData();
                        formData.append('avatar', avatarInput);
                        axios.post(`${avatarUrl}/${userId}`, formData, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,

                                'content-type': 'multipart/form-data',
                            }


                        }).then(res => {
                            // toast.success('upload success')
                        })
                            .catch(err => {

                                // toast.error('upload fail')
                            });
                    }

                    if (response.status == 250) {

                        // setErrorsRegister(response.data.message)

                    } else if (response.status == 200) {

                        console.log("good");

                        //Should logged in first by history.push what is the route ?

                        history.push("/welcome");

                        // window.location = "http://localhost:3000/home";

                    }

                },
                    (error) => {
                        console.log(error.message, "ERRROserR");
                        console.log(error);


                        error.message = " Email address is already taken";
                        // setErrorsRegister(error.message)

                        seterror(error.message)
                        //   toast(error.message)
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

                        address:addr,
                        distance, region, transportation

                        // image_path:data

                    }, {

                    withCredentials: true,

                }).then((response) => {
                    setServiceObj(response.data);

                    // setAddress(response.data);
                    console.log('====================================');
                    console.log(response);
                    console.log('====================================');
                    console.log(response.data.user.toString());
                    let userId = response.data.user._id.toString()
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

                        // setErrorsRegister(response.data.message)

                    } else if (response.status == 200) {

                        console.log("good");

                        //Should logged in first by history.push what is the route ?

                        history.push("/welcome");

                        // window.location = "http://localhost:3000/home";

                    }

                },
                    (error) => {
                        console.log('====================================');
                        console.log(error.message, "ERRROserR");
                        console.log(error);


                        console.log('====================================');
                        error.message = " Email address is already taken";
                        // setErrorsRegister(error.message)

                        seterror(error.message)
                        //   toast(error.message)
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

            <h4>Dont Have an Account? Create one</h4>

            <hr />

            <div>
                {
                    error ?
                        <ToastContainer /> : null}
            </div>
            <AvForm onSubmit={handleRegisterSubmit}
                //             style={
                //                 {
                //   width: 98% !important;
                //   display: inline-block !important;
                // }

                //   } 
                noValidate
            >

                <FormGroup>
                    <p className="class1" style={{ color: '#c8c0d5' }}> Choose Your Account :</p>

                    <Input type="select" name="role" id="exampleSelect"

                        {...bindrole}

                    >
                        <option>customer</option>
                        <option>serviceowner</option>
                        <option>productowner</option>

                    </Input>

                </FormGroup>

                <FormGroup>

                    <AvField type="text" name="name" placeholder="name" label="Name"

                        // pattern='[A-Za-z\\s]*'
                        validate={{
                            required: { value: true, errorMessage: 'Please enter a name' },
                            pattern: { value: '^[A-Za-z][A-Za-z0-9]*$', errorMessage: 'Your name must be composed only with letters first and numbers' },
                            minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                            maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                        }}
                        {...bindname}

                    />

                </FormGroup>

                <FormGroup>

                    <AvField type="text" name="username" placeholder="Username" label="UserName"
                        // required
                        validate={{
                            required: { value: true, errorMessage: 'Please enter a name' },
                            pattern: { value: '^[A-Za-z][A-Za-z0-9]*$', errorMessage: 'Your UserName must be composed only with letter first and numbers' },
                            minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                            maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                        }}
                        // pattern='[A-Za-z\\s]*'

                        {...bindUsernameRegister}

                    />

                </FormGroup>

                <FormGroup>

                    <AvField type="email" name="email" placeholder="E-mail" label="E-mail"

                        validate={{

                            required: { value: true, errorMessage: 'Please enter a Email' },


                            pattern: { value: '/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/', errorMessage: 'Email is  invalid ' },

                        }}
                        {...bindEmail}

                    />

                </FormGroup>



                <FormGroup>
                    <AvField type="password" name="password" placeholder="password " label="Password"
                        validate={{
                            minLength: { value: 8, errorMessage: 'Your name must be 8 characters ' },
                        }}
                        {...bindPasswordRegister}
                    />
                </FormGroup>
                <FormGroup>
                    <AvField type="password" name="password" placeholder="Password-Confirmation" label="Password-Confirmation"
                        validate={{
                            minLength: { value: 8, errorMessage: 'Your name must be 8 characters and match the original password ' },
                        }}
                        {...bindPassConfRegister}
                    />
                </FormGroup>


                {role === "productowner" ?

                    <FormGroup>
                        <Label >productowner</Label>


                        <AvField type="text" name="marketName" placeholder="Brand-Name" label="Brand-Name"
                            validate={{
                                required: { value: true, errorMessage: 'Please enter a name' },
                                pattern: { value: '^[A-Za-z][A-Za-z0-9]*$', errorMessage: 'Your name must be composed only with letters first and numbers' },

                            }}                              {...bindMn}

                        />
                        <AvField type="text" name="marketPhone" placeholder="marketPhone" label="Market-Phone"

                            {...bindMp}

                        />
                        <AvField type="text" name="ownerName" placeholder="ownerName"
                            validate={{
                                required: { value: true, errorMessage: 'Please enter a name' },
                                pattern: { value: '^[A-Za-z][A-Za-z0-9]*$', errorMessage: 'Your name must be composed only with letters first and numbers' },

                            }}
                            {...bindOn}

                        />
                    </FormGroup>
                    : null
                }

                {role === "serviceowner" ?

                    <FormGroup>
                        <Label >serviceowner</Label>


                        <AvField type="number" name="distance" placeholder="distance"
                            validate={{
                                required: { value: true, errorMessage: 'Please enter distance' },

                            }}
                            {...bindD}

                        />
                        <AvField type="text" name="region" placeholder="region"
                            validate={{
                                required: { value: true, errorMessage: 'Please enter region' },

                            }}
                            {...bindR}

                        />
                        <AvField type="text" name="transportation" placeholder="transportation"
                            validate={{
                                required: { value: true, errorMessage: 'Please enter transportation' },

                            }}
                            {...bindT}

                        />
                    </FormGroup>
                    : null
                }
                <p className="class1" style={{ color: '#c8c0d5' }}> Add Optional Information :</p>

                <FormGroup >
                    {phones.map((phone, index) => {
                        return (<div key={index}>
                            <AvField className="form-input" placeholder="Phone" value={phone} name="phone"
                                validate={{
                                    pattern: { value: '^(012|011|010|015)[0-9]{8}$', errorMessage: 'You phpne must be a valid number' }
                                }}
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

                            onClick={() => setphones(phones.concat([""]))}
                        >
                            Add Phone
                      </button>
                    }
                </FormGroup>

               
                        <FormGroup >
                            <Label for="exampleAddress">Address</Label>
                            <AvField     

                                validate={{
                                required: { value: true, errorMessage: 'Please enter Address ' },

                            }}

                            
                             type="text" placeholder="address" name='area' value={fromValue} onChange={event => handlefromValueChange(event)} list="from" style={{ border: alert.type === 'error' && !address.area && '1px red solid' }} />
                            <datalist id="from">
                                <option key="source" value={address[0].area} />
                            </datalist>


                            <AvField     

validate={{
required: { value: true, errorMessage: 'Please enter Street ' },

}}
type="text" placeholder="street" name='street' value={Street} onChange={event => handleStreet(event)} style={{ border: alert.type === 'error' && !Street && '1px red solid' }} />


                        </FormGroup>

            

                <FormGroup >
                    <ImageIcon />

                    <Input style={{ display: "block" }} type="file" name="files" onChange={handleAvatarChange}

                    />
                </FormGroup>
                <Button onSubmit={handleRegisterSubmit}> Sign up</Button>


            </AvForm>
            {/* {errorsRegister ? <div className="errors-div">
                <small> {errorsRegister}</small>
            </div> : null} */}
        </div>
    )
}
export default Authentication
