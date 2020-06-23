import React from 'react'
import { Button } from 'reactstrap';

const Logout = (props) => {
    const handleClick = () => {
        localStorage.setItem("token", "");
        localStorage.removeItem("user");
        sessionStorage.setItem("user", null);
        sessionStorage.setItem("loggedIn",false);
        window.location.href = "http://localhost:3000/";
    }

    return (
        <div className="container">
            <Button onClick={handleClick}>Logout</Button>
        </div>
    );

}

export default Logout;