import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { authHeader } from '../config/config'


const Order=(props)=>{
    const[orders,setOrders]= useState([])
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    
    const{id}=props.match.params
    useEffect(()=>{
        axios.get(`${domain}/orders/${id}`, authHeader).
        then((res)=>{
            console.log(res)
            setOrders(res.data)
        }).catch(e=>{
            console.log(e)
        })
    },[])

    return(
        <>
        <h1>order Details</h1>
       
        </>
    )

}

export default Order