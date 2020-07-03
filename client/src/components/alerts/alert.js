import React from 'react';
import '../../styles/alert.scss';

const Alert = ({ alert }) => {
    return (
        <div className="alert-msg" style={{backgroundColor: alert.success && '#2ecc71'}}>
            <p>{alert.message}</p>
        </div>
    );
};

export default Alert;