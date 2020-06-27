import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Table from '../../table';
import CustomModal from './modal';
import Alert from '../../alerts/alert';
import { allRatings } from '../../../endpoints/serviceOwners';
import { handleSuccess } from '../../../errors/handleAlerts';
import '../../../styles/content.scss';
import Details from '../../product owner/productOwnerDetails/details';

const Reviews = (props) => {
    const [modal, setModal] = useState(false);
    const [record, setRecord] = useState(null);
    const [ reviews, setReviews ] = useState([]);
    const cols = [['user', 'name'], 'rating', ['order', '_id']];

    const [ alert, setAlert ] = useState({
        errors: false,
        success: false,
        message: ''
    });

    useEffect(() => {
        allRatings().then(data => {
            console.log(data.reviews);
            setReviews(data.reviews);
        });
    }, []);

    const toggle = (record) => {
        console.log(record)
        setModal(!modal)
        setRecord(record);
    };

    const details = (event, record) => {
        toggle(record);
    }

    return (
        <>
            <div className="card_one" style={{backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71'}}>
            {alert.errors || alert.success ?
                <Alert alert={alert}/>
                :
                <>
                    <h5>Reviews</h5>
                </>
            }
            </div>
            <div className="card_two">
                <Table cols={cols} data={reviews} details={details}></Table>
            </div>
            <Modal isOpen={modal} toggle={toggle} className="test">
                <CustomModal record={record}/>
            </Modal>
        </>
    )
}

export default Reviews;