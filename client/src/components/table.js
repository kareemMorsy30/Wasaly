import React, { useState, useEffect } from 'react';
import '../styles/table.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ReactStars from 'react-rating-stars-component';
import Info from './alerts/info';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Details from './product owner/productOwnerDetails/details';

const Table = ({ cols, data, editUrl, delUrl, del, options, Button, details, children }) => {
    const [modal, setModal] = useState(false);
    const [record, setRecord] = useState(null);

    useEffect(() => {}, [data])

    const toggle = (record) => {
        setModal(!modal)
        setRecord(record);
    };
    console.log(cols)
    return (
        <>
        <table id="table">
            <thead>
                <tr>
                    {cols.map((col, id) => {
                        return (
                            <th className="data-field" key={id}>{ Array.isArray(col) ? col.length===3?col[2].toUpperCase(): col[0].toUpperCase() : col.toUpperCase()}</th>
                        );
                    })}
                    <th className="actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 && data.map((record) => {
                    return (
                        <tr className="data-field" key={record._id}>
                            {cols.map((col, id) => {
                                return (
                                    <td key={id} onClick={() => toggle(record)}>
                                        { col === "image"?
                                            <img style={{width: "50px", height: "50px"}} src= {typeof record[col] == 'object' && record[col] != null
                                                ? 
                                                "http://localhost:5000/"+record[col]                                               :
                                                record[col] == 0 ? "-" : "http://localhost:5000/"+record[col]
                                            }/>
                                            : 
                                            col === "rating" ?
                                            <ReactStars className="rating"
                                                count={5}
                                                size={25}
                                                value={record[col]}
                                                edit={false}
                                                color2={'#F99A3D'} 
                                            />
                                            :
                                            Array.isArray(col)
                                                ? 
                                                record[col[0]] && record[col[0]][col[1]]
                                                : 
                                                record[col] == 0 ? "-" : record[col]
                                        }
                                        {col === 'cost' && ' EGP'}
                                    </td>
                                );
                            })}
                            {
                            options 
                            ?
                            <td>
                                <select name="category" id="category" onChange={event => options[1](event, record._id)}>
                                    {
                                        record.status === 'Canceled' ?
                                        <option disabled selected>Canceled</option>
                                        :
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
                            Button ?
                            <td className="actions">
                                <Button record={record}/>
                            </td>
                            :
                            <td className="actions">
                                {
                                    editUrl
                                    &&
                                    (
                                    typeof editUrl === "string"
                                    ?
                                    <Link to={{
                                        pathname: editUrl,
                                        state: {
                                            record
                                        }
                                    }} className="edit-record"><FontAwesomeIcon icon={faEdit} size="lg"/></Link>
                                    :
                                    <FontAwesomeIcon className="edit-icon" onClick={e => editUrl(e, record)} icon={faEdit} size="lg"/>
                                    )
                                }
                                {del ?
                                    <FontAwesomeIcon className="delete-icon" onClick={() => del(record)} icon={faTrash} size="lg"/>
                                    :
                                    <FontAwesomeIcon className="details-icon" onClick={e => details(e, record)} icon={faInfoCircle} size="2x"/>
                                }
                            </td>
                            }
                        </tr>
                    );
                })}
                {record 
                && 
                children && 
                <Modal isOpen={modal} toggle={toggle} className="test">
                    {React.cloneElement(children, { record })}
                </Modal>
                }
            </tbody>
        </table>
        {
            data.length == 0
            &&
            <Info msg="No data available!"/>
        }
        </>
    );
};

export default Table;