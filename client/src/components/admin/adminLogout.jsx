import React from 'react'
import { Button } from 'reactstrap';

const AdminLogout = (props) => {

    const handleClick = () => {
        localStorage.setItem("token", "");
        window.location.href = "http://localhost:3000/admin";
    }

    return (
        <div className="container">
            <Button onClick={handleClick}>Logout</Button>
        </div>
    );

}

export default AdminLogout;