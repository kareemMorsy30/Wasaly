import React from 'react'
import { Button } from 'reactstrap';
import { logout } from '../../endpoints/logout';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Logout = (props) => {
    const handleClick = () => {
        logout();
    }

    return (
        // <div className="container">
        //     <Button onClick={handleClick}>Logout</Button>
        // </div>
        <IconButton color="inherit" onClick={handleClick}>
            <ExitToAppIcon />
        </IconButton>
    );

}

export default Logout;