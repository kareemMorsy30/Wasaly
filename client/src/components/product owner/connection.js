import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Table from '../table';
import Modal from './modal';
import { getUnConnectedOwners, connect as connectToOwner } from '../../endpoints/productOwners';
import { handleSuccess } from '../../errors/handleAlerts';
import Alert from '../alerts/alert';

const Connections = (props) => {
    const cols = [["user", "name"], "rating", "transportation", "distance"];
    const [connections, setConnections] = useState([]);
    const [ alert, setAlert ] = useState({
        errors: false,
        success: false,
        message: ''
    });

    useEffect(() => {
        getUnConnectedOwners().then(owners => setConnections(owners));
    } ,[]);

    const connect = (event, id) => {
        console.log('connected');
        connectToOwner(id).then(owner => {
            handleSuccess(setAlert, `You connection request has been sent to ${owner.user.name}`, 5000);
            // setConnections(connections.filter(connection => {
            //     // return owner._id.toString() !== connection._id.toString()
            // }));
        });
    }

    const button = {
        name : 'Connect',
        onClick: connect
    }

    return (
        <>
        <div className="card_one" style={{backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71'}}>
            {alert.errors || alert.success ?
                <Alert alert={alert}/>
                :
                <>
                    <h5>Service owner connections</h5>
                    <Link to="/admin/books/add" className="addIcon"><FontAwesomeIcon icon={faPlusCircle}/></Link>
                </>
            }
        </div>
        <div className="card_two">
            <Table data={connections} cols={cols} button={button}><Modal /></Table>
        </div>
        </>
    )
}

export default Connections;