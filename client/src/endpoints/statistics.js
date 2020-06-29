import axios from 'axios';

export const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;

export const getStatistics = () => {
    const url = `${domain}/services/statistics`;

    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data) return res.data;
    })
    .catch(err => err);
}