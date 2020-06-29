import axios from 'axios';

export const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;

export const allRequests = () => {
    const url = `${domain}/service-owners/orders`;

    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data) return res.data;
    })
    .catch(err => err);
}

export const updateOrderStatus = (id, status) => {
    const url = `${domain}/service-owners/orders/${id}/${status}`;

    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data) return res.data;
    })
    .catch(err => console.log(err));
}

export const updateConnection = (status) => {
    const url = `${domain}/service-owners/connection/${status}`;

    return axios.patch(url, null,
    {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}

export const allRatings = () => {
    const url = `${domain}/service-owners/reviews`;

    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data) return res.data;
    })
    .catch(err => console.log(err));
}

export const getConnectedProductOwnerOrders = () => {
    const url = `${domain}/service-owners/orders/connectedwithproductowner`;

    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data) return res.data;
    })
    .catch(err => console.log(err));
}
export const updateOrderStatusOfProductOwner = (orderId,status) => {
    const url = `${domain}/service-owners/order/${orderId}/status/productowner/`;
    
    return axios.patch(url, {status},
    {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        console.log('joooooooooooooooooooooooooo')
        console.log(res.error)
        console.log(res)
        if(res.data){
            console.log(res.data)
            return res.data;
        }
    })
    .catch(err =>{
        throw new Error(err)
        console.log('hiiiiiiiiiiiiii')
    });
}