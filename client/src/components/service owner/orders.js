import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Table from '../table';
import Alert from '../alerts/alert';
import { allRequests, updateOrderStatus } from '../../endpoints/serviceOwners';
import { handleSuccess } from '../../errors/handleAlerts';
import '../../styles/content.scss';

const ServiceOwnerOrders = (props) => {
    const [ orders, setOrders ] = useState([]);
    const cols = ['item', ['customer', 'name'], 'amount', [ 'from', 'area' ], [ 'to', 'area' ], 'cost'];
    const options = ['Pending', 'Accepted', 'Rejected', 'Out for delivery', 'Delivered'];

    const [ alert, setAlert ] = useState({
        errors: false,
        success: false,
        message: ''
    });

    useEffect(() => {
        allRequests().then(requests => {
            console.log(requests);
            setOrders(requests);
        });
    }, []);

    const changeOption = (event, orderId) => {
        console.log(orders);
        const status = event.target.value;
        setOrders(orders.map(order => {
            if(order._id.toString() === orderId.toString()){
                order.status = status;
            }
            return order;
        }));
        
        updateOrderStatus(orderId, status).then(order => handleSuccess(setAlert, `Order is ${status} successfully!`, 5000)).catch(err => console.log(err));
    }

    return (
        <>
            <div className="card_one" style={{backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71'}}>
            {alert.errors || alert.success ?
                <Alert alert={alert}/>
                :
                <>
                    <h5>All Incoming orders</h5>
                    <Link to="/admin/books/add" className="addIcon"><FontAwesomeIcon icon={faPlusCircle}/></Link>
                </>
            }
            </div>
            <div className="card_two">
                <Table cols={cols} data={orders} editUrl="/admin/books/edit" options={[options, changeOption]}/>
            </div>
        </>
    )
}

export default ServiceOwnerOrders;