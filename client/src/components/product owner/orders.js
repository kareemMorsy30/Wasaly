import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Table from '../table';
import Modal from './modal';
import Alert from '../alerts/alert';
import { allOrders, updateOrderStatusOfProductOwner } from '../../endpoints/productOwners';
import { handleSuccess } from '../../errors/handleAlerts';
import '../../styles/content.scss';

const ProductOwnerOrders = (props) => {
    const [orders, setOrders] = useState([]);
    const cols = ['item', ['customer', 'name'], 'amount', ['to', 'street', 'street'], ['to', 'area', 'area'], 'cost'];
    const options = ['Pending', 'Accepted', 'Out for delivery', 'Delivered'];

    const [alert, setAlert] = useState({
        errors: false,
        success: false,
        message: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        allOrders().then(requests => {
            console.log(requests);
            requests.forEach(order =>
                order.productOwners.forEach((productOwner) => {                    
                    if (productOwner.productOwner === user.id) {
                        order.status = productOwner.status
                    }
                }))
        setOrders(requests);
        });
    }, []);

    const changeOption = (event, orderId) => {
        const status = event.target.value;
        setOrders(orders.map(order => {
            if (order._id.toString() === orderId.toString()) {
                order.status = status;
            }
            return order;
        }));

        updateOrderStatusOfProductOwner(orderId, status).then(order => handleSuccess(setAlert, `Order is ${status} successfully!`, 5000)).catch(err => console.log(err));
    }

    return (
        <>
            <div className="card_one" style={{ backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71' }}>
                {alert.errors || alert.success ?
                    <Alert alert={alert} />
                    :
                    <>
                        <h5>All Incoming orders</h5>
                    </>
                }
            </div>
            <div className="card_two">
                <Table cols={cols} data={orders} options={[options, changeOption]}><Modal /></Table>
            </div>
        </>
    )
}

export default ProductOwnerOrders;