import axios from 'axios';

export const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;

export const getUnConnectedOwners = () => {
    const url = `${domain}/product-owners/service-owners/all`;
    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}

export const connectAndDisconnect = (serviceOwnerId , type) => {
    const url = `${domain}/product-owners/${type}`;

    return axios.patch(url, {
        serviceOwnerId
    },
    {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}

export const marketDetails = () => {
    const url = `${domain}/service-owners/product-owner`;
    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}

export const allOrders = () => {
    const url = `${domain}/product-owners/orders`;

    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data) return res.data;
    })
    .catch(err => err);
}

export const updateOrderStatusOfProductOwner = (orderId,status) => {
    const url = `${domain}/product-owners/orders/${orderId}`;
    
    return axios.patch(url, {status},
    {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data){
            console.log(res.data)
            return res.data;
        }
    })
    .catch(err =>{
        throw new Error(err)
    });
}