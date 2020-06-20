import React, { useState, useEffect, Fragment } from 'react';
import { useInput } from './hooks/input-hooks';
import axios from 'axios';
import './Auth.css';
import { Link, useHistory } from "react-router-dom";
import {
    Button,
    Form,
    FormGroup,
    Input, FormText,
    Label,
} from 'reactstrap';
import { getGeoLocation } from '../../endpoints/geocoding';

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;

const Authentication = (props) => {
    const history = useHistory();
    const [errorsRegister, setErrorsRegister] = useState("");
    const { value: usernameRegister, bind: bindUsernameRegister, reset: resetUsernameRegister } = useInput('');
    const { value: passwordRegister, bind: bindPasswordRegister, reset: resetPasswordRegister } = useInput('');
    const { value: passConfRegister, bind: bindPassConfRegister, reset: resetPassConfRegister } = useInput('');
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
    const { value: name, bind: bindname, reset: resetname } = useInput('');
    const { value: role, bind: bindrole, reset: resetrole } = useInput('');
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
    const [phone, setphone] = useState('');
    const registerUrl = `${domain}/users/register`;
    const [address, setInputFields] = useState([
        { street: '', city: '', area: '', location: { latitude, longitude } }
    ]);
    const [phones, setphones] = useState([
        phone
    ]);

    const [errors, setErrors] = useState([]);
    const [avatarInput, setAvatarInput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleAvatarChange = e => {
        setAvatarInput(e.target.files[0]);
    };
    /**
     * Product Owner States 
    //  */
    const handleAddphones = () => {
        const values = [...phones];
        values.push(phone);
        setphones(values);
    };
    const handleRemovePhones = index => {
        const values = [...phones];
        values.splice(index, 1);
        setphones(values);
    };
    const handlephoneChange = (index, event) => {
        const values = [...phones];
        if (event.target.name === "phones") {
            values[index] = event.target.value;
        }
        setphones(values)
    }
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
        const input = event.target.value;
        if (input.length >= 3 && input[input.length - 1] !== ' ') {


            getGeoLocation(input).then(data => {
                console.log('====================================');
                console.log("DATAAA ", data);
                console.log("DATAAA ", data.fullArea);
                console.log('====================================');
                // address.map((address)=>{
                if (data.area) setInputFields({
                    ...address,
                    area: data.fullArea,
                    city: data.city,
                    longitude: data.longitude,
                    latitude: data.latitude,
                });

                if (data.area && !suggested.includes(data.area && data.area.toLowerCase().includes(input))) {
                    setSuggested([...suggested, data.area]);
                    // console.log('====================================');
                    // console.log("DATAAA ", data.area);
                    // console.log("DATAAA ", data.fullArea);
                    setcity(data.city);
                    setarea(data.fullArea);
                    setlatitude(data.latitude);
                    setlongitude(data.longitude);
                    // setstreet()
                    console.log('=======================inside suggest=============');
                    // setInputFields([{ street: address.street, area: data.fullArea, city: data.city, location: { latitude: data.latitude, longitude: data.longitude } }]);
                    console.log('====================================');
                    console.log(address);
                    console.log('====================================');
                }
            })
            // })
        }
        else {
            console.log('====================================');
            console.log("A7a fe aeh");
            console.log('====================================');
        }

    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (avatarInput) {
            if (
                !['image/gif', 'image/jpeg', 'image/png'].includes(avatarInput.type)
            ) {
                setErrors(['image is not valid ']);
                return;
            } else if (avatarInput.size > 3e6) {
                setErrors(['image is too large']);
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

                }).then(response => {

                    console.log(response);

                    if (response.status == 250) {

                        setErrorsRegister(response.data.message)

                    } else if (response.status == 200) {

                        console.log("good");

                        //Should logged in first by history.push what is the route ?

                        history.push("/products/list");

                        // window.location = "http://localhost:3000/home";

                    }

                })

            }

            if (passwordRegister === passConfRegister && role === "productowner") {

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

                }).then(response => {

                    console.log(response);

                    if (response.status == 250) {

                        setErrorsRegister(response.data.message)

                    } else if (response.status == 200) {

                        console.log("good");

                        //Should logged in first by history.push what is the route ?

                        history.push("/products/list");

                        // window.location = "http://localhost:3000/home";

                    }

                })

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

                }).then(response => {

                    console.log(response);

                    if (response.status == 250) {

                        setErrorsRegister(response.data.message)

                    } else if (response.status == 200) {

                        console.log("good");

                        //Should logged in first by history.push what is the route ?

                        history.push("/products/list");

                        // window.location = "http://localhost:3000/home";

                    }

                })

            }

        }
        catch (error) {
            setIsLoading(false);
            console.log(error);

            setErrors([error.response.message]);
        }
    }


    return (

        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 '>

            <h4>Dont Have an Account ? Create one</h4>

            <hr />

            <Form onSubmit={handleRegisterSubmit} >
                <FormGroup>

                    <Input type="text" name="name" placeholder="name"

                        pattern='[A-Za-z\\s]*'

                        {...bindname}

                    />

                </FormGroup>

                {phones.map((inputField, index1) => (
                    <Fragment key={`${inputField}~${index1}`}>
                        <FormGroup>
                            <Input type="text" name="phones" placeholder="phones"
                                pattern='(01)[0-9]{9}'
                                value={inputField}
                                onChange={event => handlephoneChange(index1, event)}
                            />
                        </FormGroup>

                        <div className="form-group col-sm-2">
                            <button
                                className="btn btn-link"
                                type="button"
                                onClick={() => handleRemovePhones(index1)}
                            >
                                -
                </button>
                            <button
                                className="btn btn-link"
                                type="button"
                                onClick={() => handleAddphones()}
                            >
                                +
                </button>
                        </div>
                    </Fragment>
                ))}

                <FormGroup>

                    <Input type="select" name="role" id="exampleSelect"

                        {...bindrole}

                    >

                        <option>serviceowner</option>

                        <option>customer</option>


                        <option>productowner</option>

                    </Input>


                </FormGroup>

                <FormGroup>

                    <Input type="text" name="username" placeholder="Username"

                        pattern='[A-Za-z\\s]*'

                        {...bindUsernameRegister}

                    />

                </FormGroup>

                <FormGroup>

                    <Input type="email" name="email" placeholder="E-mail"

                        {...bindEmail}

                    />

                </FormGroup>

                {

                    console.log("Kareeem : ", address)
                }


                {address.length > 0 && address.map((inputField, index) => (
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
                                remove
                </button>
                            <button
                                className="btn btn-link"
                                type="button"
                                onClick={() => handleAddFields()}
                            >
                                add
                </button>
                        </div>
                    </Fragment>
                ))}
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
                <FormGroup row>
                    <Input type="file" name="file" id="exampleFile" onChange={handleAvatarChange}

                    />
                    <FormText color="muted">
                        Add Your Image :)
                    </FormText>
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

                <Button onSubmit={handleRegisterSubmit}> Sign up</Button>
            </Form>
            {errorsRegister ? <div className="errors-div">
                <small> {errorsRegister}</small>
            </div> : null}
        </div>
    )
}
export default Authentication