import React from 'react';
import { Alert } from 'reactstrap';
import '../../styles/info.scss';

const Info = ({ msg }) => {
    return (
        <div className="container">
            <Alert color="danger text-center info-danger">
                {msg}
            </Alert>
        </div>
    )
}

export default Info;