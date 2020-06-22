import React from 'react';
import { Alert } from 'reactstrap';

const Info = (props) => {
    return (
        <div className="container">
            <Alert color="info text-center">
                You are not connected to any product owner yet!
            </Alert>
        </div>
    )
}

export default Info;