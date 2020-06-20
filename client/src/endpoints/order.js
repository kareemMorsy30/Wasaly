import axios from 'axios';

export const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;

export const getAvailableTransportations = () => {
    const url = `${domain}/services/transportations`;
    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}

export const getAvailableServiceOwners = (order, owner) => {
    const url = `${domain}/services/available/owners`;
    console.log(localStorage.getItem("token"));

    return axios.post(url, {
        ...order
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

export const submitOrder = (order, owner) => {
    const url = `${domain}/services/orders`;

    return axios.post(url, {
        ...order,
        serviceOwnerId: owner._id
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