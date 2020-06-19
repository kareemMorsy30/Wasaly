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

const Authentication = (props) => {
    const history = useHistory();
    const [errorsRegister, setErrorsRegister] = useState("");
    const { value: usernameRegister, bind: bindUsernameRegister, reset: resetUsernameRegister } = useInput('');
    const { value: passwordRegister, bind: bindPasswordRegister, reset: resetPasswordRegister } = useInput('');
    const { value: passConfRegister, bind: bindPassConfRegister, reset: resetPassConfRegister } = useInput('');
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
    const { value: name, bind: bindname, reset: resetname } = useInput('');
    const { value: role, bind: bindrole, reset: resetrole } = useInput('');
    // const { value: image_path, bind: bindimage_path, reset: resetimage_path } = useInput('');
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
    const registerUrl = `http://localhost:5000/users/register`
    const [address, setInputFields] = useState([
        { street: '', city: '', area: '', location: { latitude, longitude } }
    ]);
    const [phones, setphones] = useState([
        phone
    ]);

// //    const [image_path, setimage_path] = useState();
//     const [selectedFile, setselectedFile] = useState()
const [errors, setErrors] = useState([]);

const [avatarInput, setAvatarInput] = useState(null);
const [isLoading, setIsLoading] = useState(false);

const handleAvatarChange = e => {
    setAvatarInput(e.target.files[0]);
  };

/**
 * Product Owner States 
//  */
// const [marketName, setmarketName] = useState('');
// const [ownerName, setownerName] = useState('');
// const [marketPhone, setmarketPhone] = useState('');




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

    const handleInputChange = (index, event) => {
        const values = [...address];
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

        setInputFields(values);
    };


    const handleRegisterSubmit = async (e) => {
        // const data = new FormData()
        // data.append('file', selectedFile)
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
            if (passwordRegister === passConfRegister && role==="customer" ) {

                const registerResult = await axios.post(registerUrl,
    
                    {
    
                        username: usernameRegister,
    
                        password: passwordRegister,
    
                        email,
    
                        name,
    
                        phones,
    
                        role,
    
                        address,
    
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
    
            if (passwordRegister === passConfRegister && role==="productowner" ) {

                const registerResult = await axios.post(registerUrl,
    
                    {
    
                        username: usernameRegister,
    
                        password: passwordRegister,
    
                        email,
    
                        name,
    
                        phones,
    
                        role,
    
                        address,
                        marketName,marketPhone,ownerName
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
    
    
            if (passwordRegister === passConfRegister && role==="serviceowner" ) {

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
                   
                        {address.map((inputField, index) => (
                    <Fragment key={`${inputField}~${index}`}>
                    
                        <FormGroup >
                    
                            <Label for="exampleAddress">Address</Label>

                            <Input type="text" name="street" placeholder="street"

                                pattern='[A-Za-z\\s]*'
                                value={inputField.street}
                                // {...bindstreet}
                                // {...bindaddress}
                                onChange={event => handleInputChange(index, event)}

                            />

                            <Input type="text" name="city" placeholder="city"

                                pattern='[A-Za-z\\s]*'

                                // {...bindcity}
                                // {...bindaddress}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <Input type="text" name="area" placeholder="area"
                                pattern='[A-Za-z\\s]*'
                                // {...bindarea}
                                // {...bindaddress}
                                onChange={event => handleInputChange(index, event)}
                            />
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

                {role==="productowner"?
                
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
:null
                }

                {role==="serviceowner"?
                
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
:null
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