import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { updateConnection } from '../../../endpoints/serviceOwners';
import '../../../styles/operation_holder.scss';
import { handleSuccess, handleError } from '../../../errors/handleAlerts';

const OperationHolder = ({ market, setStatus, status, setAlert, alert }) => {
    const handleAccept = event => {
        updateConnection('accept')
        .then(connection => {
            setStatus(connection.status);
            handleSuccess(setAlert, `Congratulations! You are now connected`, 5000);
        });
    }

    const handleReject = event => {
        updateConnection('reject')
        .then(connection => setStatus(connection.status))
        .catch(err => console.log(err))
    }

    return (
        <div className="left-card">
            <div className="owner-img">
                <img className="book-img" src={market.user.image_path ? market.user.image_path : "../../img/market.png"} alt="Market image"/>
                <p className="name-section">{market.marketName}</p>
                {
                    status === 'Pending'
                    ?
                    <>
                    <Button onClick={handleAccept} color="success">Accept</Button>
                    <Button onClick={handleReject} color="danger">Reject</Button>
                    </>
                    :
                    <div>
                        <Button onClick={handleReject} className="remove-connection" color="danger"><FontAwesomeIcon icon={faUserSlash}></FontAwesomeIcon> Remove</Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default OperationHolder;