import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';
import Moment from 'react-moment';
import Info from '../../alerts/info';

const Modal = ({ record }) => {
    function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const createdAtA = a.createdAt;
        const createdAtB = b.createdAt;
      
        let comparison = 0;
        if (createdAtA > createdAtB) {
          comparison = 1;
        } else if (createdAtA < createdAtB) {
          comparison = -1;
        }
        return comparison;
    }

    return (
        <>
        <ModalHeader className="modal-layout">{record.user && record.user.username}</ModalHeader>
        <ModalBody>
            <div className="body-section">
                <div className="image-section">
                    <img className="user-profile" src={record.user && record.user.avatar ? record.user.avatar : "../../img/user.png"}/>
                </div>
                <div className="details-section">
                    <label>Item to deliver</label>
                    <input type="text" placeholder="Item to deliver" value={record.order && record.order.item} readOnly/>
                    <label>From</label>
                    <input type="text" placeholder="From" value={record.order && record.order.from.area} readOnly/>
                    <label>To</label>
                    <input type="text" placeholder="To" value={record.order && record.order.to.area} readOnly/>
                    <label>Status</label>
                    <input type="text" placeholder="Delivery status" value={record.order && record.order.status} readOnly/>
                </div>
            </div>
        
            <hr></hr>
            <div className="description-section">
            <h4 className="text-center">Reviews</h4>
            {
                record.reviews && record.reviews.length > 0
                ?
                record.reviews.map(report => {
                    return (
                    <>
                    <label className="modal-title">{record.user && record.user.name}:</label>
                    <Moment style={{color: 'black', fontSize: 'small'}} format="D MMM YYYY" withTitle>{record.createdAt && record.createdAt}</Moment>
                    <textarea placeholder="More info" value={report.review} readOnly/>
                    </>
                    );
                })
                :
                <Info msg="No reviews yet!"/>
            }
            </div>
        </ModalBody>
        </>
    )
}

export default Modal;