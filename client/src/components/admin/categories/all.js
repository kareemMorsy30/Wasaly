import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Table from '../../table';
import ModalForm from './components/modalForm';
import NavBar from '../adminNavBar';
import Alert from '../../alerts/alert';
import { getCategories } from '../../../endpoints/admin';
import { addCategory, updateCategory, removeCategory } from '../../../endpoints/admin';
import { handleSuccess } from '../../../errors/handleAlerts';

const All = (props) => {
    const cols = ['name', 'image'];
    let [categories, setCategories] = useState([]);
    let [category, setCategory] = useState({
        _id: null,
        name: '',
        image: ''
    });
    const [ alert, setAlert ] = useState({
        errors: false,
        success: false,
        message: ''
    });
    let [title, setTitle] = useState('');
    let [button, setButton] = useState('');

    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    useEffect(() => {
        getCategories()
        .then(allCategories => setCategories(allCategories));
    }, []);

    const toggle = (event, record = null) => {
        setModal(!modal);
        if(record !== null){
            setCategory({...category, name: record.name, image: record.image, _id: record._id});
            setTitle('Edit Category');
            setButton('Update');
        }else{
            setCategory({name: '', image: '', _id: null});
            setTitle('Add Category');
            setButton('Submit');
        }
    }

    const removeRecord = (record) => {
        removeCategory(record._id)
        .then(category => {
            setCategories(categories.filter(cat => cat._id.toString() !== record._id.toString()));
            handleSuccess(setAlert, `Category ${category.name} is deleted successfully`, 5000);
        });
    }

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
                <Table data={categories} cols={cols} editUrl={toggle} del={removeRecord}/>
            </div>
            <ModalForm 
            setModal={setModal} 
            modal={modal} 
            unmountOnClose={unmountOnClose} 
            allData={categories} 
            setAllData={setCategories} 
            data={category} 
            setData={setCategory} 
            addEndpoint={addCategory}
            editEndpoint={updateCategory}
            title={title}
            button={button}
            />
        </>
    );
}

export default All;