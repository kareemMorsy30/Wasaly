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