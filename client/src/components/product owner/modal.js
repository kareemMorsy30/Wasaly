import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';
import ReactStars from 'react-rating-stars-component';

const Modal = ({ record, Flag, Description }) => {
    return (
        <>
        <ModalHeader><div className="modal-title">{record.user && record.user.name}</div><div className="modal-flag"><Flag record={record}/></div></ModalHeader>
        <ModalBody>
            <div className="body-section">
                <div className="image-section">
                    <img className="user-profile" src={record.user && record.user.avatar ? record.user.avatar : "../../img/user.png"}/>
                </div>
                <div className="details-section">
                    <label>Username</label>
                    <input type="text" placeholder="Username" value={record.user && record.user.username} readOnly/>
                    <label>Email</label>
                    <input type="text" placeholder="Email" value={record.user && record.user.email} readOnly/>
                    <label>Phone</label>
                    <input type="text" placeholder="Phone" value={record.user && record.user.phones[0]} readOnly/>
                    <label>Address</label>
                    <input type="text" placeholder="Address" value={record.user && record.user.address.length > 0 ? record.user.address[0].area && `${record.user.address[0].area} ${record.user.address[0].city}` : ''} readOnly/>
                </div>
            </div>
        
            <hr></hr>
            <div className="description-section">
                {
                    !Description
                    ?
                    <>
                    <label>Rating</label>
                    <ReactStars
                        count={5}
                        size={25}
                        value={record.rating}
                        edit={false}
                        color2={'#F99A3D'} 
                    />
                    </>
                    :
                    <Description record={record}/>
                }
            </div>
        </ModalBody>
        </>
    )
}

export default Modal;