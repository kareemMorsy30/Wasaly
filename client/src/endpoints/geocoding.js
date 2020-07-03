import axios from 'axios';

export const bing_key = `${process.env.REACT_APP_BING_KEY}`;

export const getGeoLocation = (input) => {
    const url = `http://dev.virtualearth.net/REST/v1/Locations/egypt%20${input}?o=json&key=${bing_key}`;

    return axios.get(url).then(res => {
        if(res.data){
            const data = {
                fullArea: res.data.resourceSets[0].resources[0].name,
                area: res.data.resourceSets[0].resources[0].address.addressLine,
                city: res.data.resourceSets[0].resources[0].address.adminDistrict,
                latitude: res.data.resourceSets[0].resources[0].point.coordinates[0],
                longitude: res.data.resourceSets[0].resources[0].point.coordinates[1],
            }

            return data;
        }
    }).catch(err => err);
}