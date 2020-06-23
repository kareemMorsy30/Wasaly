import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';

const Modal = ({ record }) => {
    return (
        <>
        <ModalHeader>{record.customer && record.customer.name}</ModalHeader>
        <ModalBody>
            {
            !['Pending', 'Canceled', 'Rejected'].includes(record.status) 
            ?
            <>
            <div className="body-section">
                <div className="image-section">
                    <img className="user-profile" src={record.customer && record.customer.image_path ? record.customer.image_path : "../../img/user.png"}/>
                </div>
                <div className="details-section">
                    <label>Username</label>
                    <input type="text" placeholder="Username" value={record.customer && record.customer.username} readOnly/>
                    <label>Email</label>
                    <input type="text" placeholder="Email" value={record.customer && record.customer.email} readOnly/>
                    <label>Phone</label>
                    <input type="text" placeholder="Phone" value={record.customer && record.customer.phones[0]} readOnly/>
                    <label>Address</label>
                    <input type="text" placeholder="Address" value={record.customer && record.customer.address.length > 0 && record.customer.address[0].area && `${record.customer.address[0].area} ${record.customer.address[0].city}`} readOnly/>
                </div>
            </div>
        
            <hr></hr>
            <div className="description-section">
                <label>Order details</label>
                <textarea placeholder="More info" value={record.description} readOnly/>
            </div>
            </>
            :
            <div className="container">You have to accept order first to show customer details</div>
            }
        </ModalBody>
        </>
    )
}

export default Modal;