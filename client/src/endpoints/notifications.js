import axios from 'axios';

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;

export const getNotifications = () => {
    const url = `${domain}/services/notifications`;
    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}