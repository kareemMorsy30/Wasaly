import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUserFriends, faWindowClose, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import Table from '../table';
import Modal from './modal';
import { getUnConnectedOwners, connectAndDisconnect } from '../../endpoints/productOwners';
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

    const connect = (event, id, type) => {
        connectAndDisconnect(id, type).then(owner => {
            if(type === 'connect') handleSuccess(setAlert, `Your connection request has been sent to ${owner.user.name}`, 5000);
            if(type === 'disconnect') handleSuccess(setAlert, `You have removed ${owner.user.name} from your connections`, 5000);
            setConnections(connections.map(connection => {
                if(connection._id.toString() === owner._id.toString()){
                    connection.productOwner.status = owner.productOwner.status;
                }
                return connection;
            }));
        });
    }

    const button = ({record}) => {
        if(record.productOwner.status === 'Not connected'){
            return (
                <button className="submit-btn request-del-btn" onClick={event => connect(event, record, 'connect')}><FontAwesomeIcon icon={faUserFriends}/> Connect</button>
            );
        }else if(record.productOwner.status === 'Pending'){
            return (
                <button className="submit-btn request-del-btn" onClick={event => connect(event, record, 'disconnect')}><FontAwesomeIcon icon={faWindowClose}/> Cancel</button>
            );
        }else if(record.productOwner.status === 'Connected'){
            return (
                <button className="submit-btn request-del-btn" onClick={event => connect(event, record, 'disconnect')}><FontAwesomeIcon icon={faUserSlash}/> Remove</button>
            );
        }
        
    }

    return (
        <>
        <div className="card_one" style={{backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71'}}>
            {alert.errors || alert.success ?
                <Alert alert={alert}/>
                :
                <>
                    <h5>Service owner connections</h5>
                </>
            }
        </div>
        <div className="card_two">
            <Table data={connections} cols={cols} Button={button}><Modal /></Table>
        </div>
        </>
    )
}

export default Connections;