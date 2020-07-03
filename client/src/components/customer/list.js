import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Table } from 'reactstrap';
import { useHistory } from "react-router-dom";
import '../../styles/stripped-list.scss';
import { submitOrder } from '../../endpoints/order';

const List = ({ serviceOwners, order }) => {
    let history = useHistory()
    useEffect(() => {

    }, [serviceOwners]);

    const selectOwner = (owner) => {
        console.log(owner);
        console.log(order);
        submitOrder(order, owner)
        .then(order => {
            history.push(`/orders/${order._id}`);
        })
    }

    return (
        <Table striped className="table-striped">
            <tbody>
                {
                    serviceOwners.map((owner, index) => {
                        return (
                            <tr>
                                <th className="text-center align-middle" scope="row">{index+1}</th>
                                <td className="text-center align-middle">{owner.user.name}</td>
                                <td className="text-center align-middle">
                                    <ReactStars
                                        count={5}
                                        size={25}
                                        value={owner.rating}
                                        edit={false}
                                        color2={'#F99A3D'} 
                                    />
                                </td>
                                <td className="text-center align-middle"><button onClick={() => selectOwner(owner)} className="submit-btn request-del-btn">Request</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

export default List;