import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { authHeader } from '../config/config'
import {Link} from 'react-router-dom'
import RateService from '../rateService'
import '../../styles/order.scss'
const Order=()=>{
    const[orders,setOrders]= useState([])
    const[cancelled, setCancelled]= useState(false)
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    
    useEffect(()=>{
        axios.get(`${domain}/orders/user`, authHeader).
        then((res)=>{
            console.log(res)
            setOrders(res.data)
        }).catch(e=>{
            console.log(e)
        })
    },[cancelled])

    const cancelOrder=(orderId)=>{
        axios.post(`${domain}/orders/${orderId}/cancel/`, {},authHeader)
        .then(response => {
            console.log(response); 
            setCancelled(prevState=> !prevState)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return(
        <>

        <div className="container" style={{marginTop:'50px'}}>
              <h2 style={{width:'80%', padding:' 10px', margin: '10px auto'}}>Track Your Orders</h2>
        {orders.map(order=>
                <div className="row order">
                    <div className="col-3">
                       { order._id}
                    </div>
                    <div className="col-2">
                       { order.status} 
                    </div>
                    <div className="col-2">
                       {order.status==='Pending'&& <a onClick={()=>cancelOrder(order._id)}>Cancel order</a>}
                    </div>
                    <div className="col-2">
                       <Link to={`orders/${order._id}`}>View Order Details</Link>
                    </div>
                    <div className="col-3">
                      {order.service&& 'Rate this service'}
                      <RateService serviceId={order.service} rate={order.rate.rating} order={order._id}/>
                    </div>
                </div>
        )}
        </div>
        </>
    )

}

export default Order