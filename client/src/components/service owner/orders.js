import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Table from '../table';
import { allRequests, updateOrderStatus } from '../../endpoints/serviceOwners';
import '../../styles/content.scss';

const ServiceOwnerOrders = (props) => {
    const [ orders, setOrders ] = useState([]);
    const cols = ['item', ['customer', 'name'], 'amount', [ 'from', 'area' ], [ 'to', 'area' ], 'cost'];
    const options = ['Pending', 'Canceled', 'Accepted', 'Rejected', 'Out for delivery', 'Delivered'];

    useEffect(() => {
        allRequests().then(requests => {
            console.log(requests);
            setOrders(requests);
        });
    }, []);

    const changeOption = (event, orderId) => {
        console.log('executed');
        updateOrderStatus(orderId).then(order => console.log(order)).catch(err => console.log(err));
    }

    return (
        <>
            <div className="card_one">
                <h5>All Incoming orders</h5>
                <Link to="/admin/books/add" className="addIcon"><FontAwesomeIcon icon={faPlusCircle}/></Link>
            </div>
            <div className="card_two">
                <Table cols={cols} data={orders} editUrl="/admin/books/edit" options={[options, changeOption]}/>
            </div>
        </>
    )
}

export default ServiceOwnerOrders;