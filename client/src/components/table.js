import React, { useState, useEffect } from 'react';
import '../styles/table.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Table = ({ cols, data, editUrl, delUrl, del, options }) => {
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState(null);

    useEffect(() => {}, [data])

    const toggle = (record) => {
        setModal(!modal)
        setOrder(record);
        console.log(record);
    };
    
    return (
        <table id="table">
            <thead>
                <tr>
                    {cols.map((col, id) => {
                        return (
                            <th key={id}>{Array.isArray(col) ? col[0] : col}</th>
                        );
                    })}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((record) => {
                    return (
                        <tr key={record._id} onClick={() => toggle(record)}>
                            {cols.map((col, id) => {
                                return (
                                    <td key={id}>
                                        { col === "image"?
                                            <img style={{width: "50px", height: "50px"}} src= {typeof record[col] == 'object' && record[col] != null
                                                ? 
                                                "http://localhost:5000/"+record[col]                                               :
                                                record[col] == 0 ? "-" : "http://localhost:5000/"+record[col]
                                            }/>
                                            : Array.isArray(col)
                                                ? 
                                                record[col[0]][col[1]]
                                                : 
                                                record[col] == 0 ? "-" : record[col]
                                        }

                                    </td>
                                );
                            })}
                            {
                            options 
                            ?
                            <td>
                                <select name="category" id="category" onChange={event => options[1](event, record._id)}>
                                    {
                                        options[0].map(option => {
                                            return option === record.status
                                            ?
                                            <option disabled selected value={option}>{option}</option>
                                            :
                                            ['Accepted'].includes(record.status) && ['Pending', 'Canceled', 'Rejected'].includes(option) ? 
                                            <option disabled value={option}>{option}</option>
                                            :
                                            !['Rejected'].includes(record.status) &&
                                            <option value={option}>{option}</option>
                                        })
                                    }
                                </select>
                            </td>
                            :
                            <td className="actions">
                                <Link to={{
                                    pathname: editUrl,
                                    state: {
                                        record
                                    }
                                }} className="edit-record"><FontAwesomeIcon icon={faEdit}/></Link>
                                {del ?
                                    <a onClick={() => del(record)} className="delete-record"><FontAwesomeIcon icon={faTrash}/></a>
                                    :
                                    <Link to={{
                                        pathname: delUrl,
                                        state: {
                                            record
                                        }
                                    }} className="delete-record"><FontAwesomeIcon icon={faTrash}/></Link>
                                }
                            </td>
                            }
                        </tr>
                    );
                })}
                {order 
                && 
                <Modal isOpen={modal} toggle={toggle} className="test">
                    <ModalHeader toggle={toggle}>{order.customer && order.customer.name}</ModalHeader>
                    <ModalBody>
                        {
                        !['Pending', 'Canceled', 'Rejected'].includes(order.status) 
                        ?
                        <>
                        <div className="body-section">
                            <div className="image-section">
                                <img className="user-profile" src={order.customer && order.customer.image_path ? order.customer.image_path : "../../img/user.png"}/>
                            </div>
                            <div className="details-section">
                                <label>Username</label>
                                <input type="text" placeholder="From" value={order.customer && order.customer.username} readOnly/>
                                <label>Email</label>
                                <input type="text" placeholder="To" value={order.customer && order.customer.email} readOnly/>
                                <label>Phone</label>
                                <input type="text" placeholder="To" value={order.customer && order.customer.phones[0]} readOnly/>
                                <label>Address</label>
                                <input type="text" placeholder="Address" value={order.customer && order.customer.address.length > 0 && order.customer.address[0].area && `${order.customer.address[0].area} ${order.customer.address[0].city}`} readOnly/>
                            </div>
                        </div>
                    
                        <hr></hr>
                        <div className="description-section">
                            <label>Order details</label>
                            <textarea placeholder="More info" value={order.description} readOnly/>
                        </div>
                        </>
                        :
                        <div className="container">You have to accept order first to show customer details</div>
                        }
                    </ModalBody>
                </Modal>
                }
            </tbody>
        </table>
    );
};

export default Table;