import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Table from '../../table';
import ModalForm from './components/modalForm';
import NavBar from '../adminNavBar';
import Alert from '../../alerts/alert';
import { getCategories } from '../../../endpoints/admin';
import { handleSuccess } from '../../../errors/handleAlerts';

const All = (props) => {
    const cols = ['name', 'image'];
    let [categories, setCategories] = useState([]);

    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    useEffect(() => {
        getCategories()
        .then(allCategories => setCategories(allCategories));
    }, []);

    const toggle = () => setModal(!modal);

    return (
        <>
            <div className="card_one" style={{backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71'}}>
                {alert.errors || alert.success ?
                    <Alert alert={alert}/>
                    :
                    <>
                        <h5>All categories</h5>
                        <FontAwesomeIcon className="addIcon" onClick={toggle} icon={faPlusCircle}/>
                    </>
                }
            </div>
            <div className="card_two">
                <Table data={categories} cols={cols} />
            </div>
            <ModalForm setModal={setModal} modal={modal} unmountOnClose={unmountOnClose}/>
        </>
    );
}

export default All;