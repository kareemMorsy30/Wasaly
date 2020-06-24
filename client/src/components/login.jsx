import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


const Login = (props) => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const domain= `${process.env.REACT_APP_BACKEND_DOMAIN}`

    const hanleEmailChange = (e) => {
        const { target: { value } } = e;
        setEmailInput(value);
    }

    const hanlePasswordChange = (e) => {
        const { target: { value } } = e;
        setPasswordInput(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `${domain}/users/login`,
            data: {
                email: emailInput,
                password: passwordInput
            }
        }).then((response) => {
            const { token, user } = response.data;         
            localStorage.setItem("token", token);
            console.log(user)
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "http://localhost:3000/";
        }, (error) => {
            console.log(error);
        });

        setEmailInput('');
        setPasswordInput('');
    }
    return (
        <div className="container">
            <Form inline>
                <div style={{width: "83%"}}>
                    <FormGroup style={{paddingBottom:'8px'}} className="mb-2 mr-sm-2 mb-sm-0">
                        <Label style={{width:'20%'}}for="Email" className="mr-sm-2">Email</Label>
                        <Input type="email" name="email" id="Email" placeholder="Email" value={emailInput} onChange={hanleEmailChange} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label style={{width:'20%', paddingRight:"2px"}} for="Password" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" id="Password" placeholder="Password" value={passwordInput} onChange={hanlePasswordChange} />
                    </FormGroup>

                </div>
                <Button onClick={handleSubmit}>Login</Button>
            </Form>
        </div>
    );
}

export default Login;