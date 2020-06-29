import React, { Component, useState } from 'react'
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios'

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

const CLIENT_ID =`${process.env.REACT_APP_GOOGLE_API_WASALY_ID}`
console.log(CLIENT_ID)

const GoogleBtn = (props) => {

    const [isLogined, setIsLogedin] = useState(false)
    const [accessToken, setAccessToken] = useState('')

    const login = (res) => {
       
        const googleresponse = {

            Name: res.profileObj.name,

            email: res.profileObj.email,

            token: res.tokenId,

            Image: res.profileObj.imageUrl,

            ProviderId: 'Google'


        };

        axios.post(`${domain}/users/googlesigin`, googleresponse)

            .then((result) => {
                console.log(result)
                const { token, user } = result.data;

                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);

                window.location.href = "http://localhost:3000/";


            });
    }

    const logout = (response) => {
        setIsLogedin(false)
        setAccessToken('')

    }

    const handleLoginFailure = (response) => {
        console.log('Failed to log in')
    }

    const handleLogoutFailure = (response) => {
        console.log('Failed to log out')
    }

    return (
        <div>
            {isLogined ?
                <GoogleLogout
                    clientId={CLIENT_ID}
                    buttonText='Logout'
                    onLogoutSuccess={logout}
                    onFailure={handleLogoutFailure}
                >
                </GoogleLogout> : <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText='Login'
                    onSuccess={login}
                    onFailure={handleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    responseType='code,token'
                />
            }
            {accessToken ? <h5>Your Access Token: <br /><br /> {accessToken}</h5> : null}

        </div>
    )

}

export default GoogleBtn;