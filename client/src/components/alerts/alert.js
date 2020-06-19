import React from 'react';
import '../../styles/alert.scss';

const Alert = ({ message, type }) => {
    return (
        <div className="alert-msg" style={{backgroundColor: type === 'success' && '#2ecc71'}}>
            <p>{message}</p>
        </div>
    );
};

export default Alert;