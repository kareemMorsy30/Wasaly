import React from 'react'
import { Button } from 'reactstrap';
import { logout } from '../../endpoints/logout';

const Logout = (props) => {
    const handleClick = () => {
        logout();
    }

    return (
        <div className="container">
            <Button onClick={handleClick}>Logout</Button>
        </div>
    );

}

export default Logout;