import axios from 'axios';

export const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;

export const getAvailableTransportations = () => {
    console.log(domain);
    const url = `${domain}/services/transportations`;
    return axios.get(url, {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU0ZTFiOTFjNjQ5YTI0ZTgwYTg1ZmIiLCJpYXQiOjE1OTIzNTE1MzEsImV4cCI6MTU5MjUyNDMzMX0.oAOCvvPE2BrheJzqyo18efFBCEDc7XzRsuXerhdFuFg` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}