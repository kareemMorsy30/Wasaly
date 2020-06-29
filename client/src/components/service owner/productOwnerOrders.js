import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Table from '../table';
import CustomModal from './modal';
import Alert from '../alerts/alert';
import { getConnectedProductOwnerOrders, updateOrderStatusOfProductOwner } from '../../endpoints/serviceOwners';
import { handleSuccess,handleError } from '../../errors/handleAlerts';
import '../../styles/content.scss';
import Details from '../product owner/productOwnerDetails/details';

const ConnectedProductOwnerOrders = (props) => {
    const [record, setRecord] = useState(null);
    const [ orders, setOrders ] = useState([]);
    const [render,reRender]=useState(false)
    const cols = [['to', 'street','Street'],['to', 'area','Area'],['to', 'city','city'],  '_id'];
    const options = ['Choose Action', 'Accepted', 'Out for delivery', 'Delivered'];
    
    const [ alert, setAlert ] = useState({
        errors: false,
        success: false,
        message: ''
    });

    useEffect(() => {
        getConnectedProductOwnerOrders().then(data => {
            console.log(data);
            setOrders(data);
        });
    }, [render]);

    const changeOption = (event, orderId) => {
        const status = event.target.value;
        if(status !=='Choose Action'){
            updateOrderStatusOfProductOwner(orderId, status)
            .then(order => handleSuccess(setAlert, `Order is ${status} successfully!`, 5000))
            .catch(err => handleError(setAlert,"Error, Order is Already Accepted by another Service Owner"));

            reRender((prev)=>!prev)
        }
        
        // updateOrderStatus(orderId, status).then(order => handleSuccess(setAlert, `Order is ${status} successfully!`, 5000)).catch(err => console.log(err));
    }

    return (
        <>
            <div className="card_one" style={{backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71'}}>
            {alert.errors || alert.success ?
                <Alert alert={alert}/>
                :
                <>
                    <h5>Product owner orders</h5>
                </>
            }
            </div>
            <div className="card_two">
                <Table cols={cols} data={orders} options={[options, changeOption]}></Table>
            </div>
          
        </>
    )
}

export default ConnectedProductOwnerOrders;