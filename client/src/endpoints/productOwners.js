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

export const connect = (serviceOwnerId) => {
    const url = `${domain}/product-owners/connect`;

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