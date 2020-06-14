const axios = require('axios');
const userModel = require('../models/user');
const { Order, ServiceOwner } = require('./../models/allModels');


const getDistance = async (source, destination, location = null) => {
    const key = process.env.BING_KEY;
    let firstDistance = 0;
    if(location != null){
        const response = await axios.get(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${location.latitude},${location.longitude}&destinations=${source.latitude},${source.longitude}&travelMode=driving&key=${key}`);
        firstDistance = response.data && response.data.resourceSets[0].resources[0].results[0].travelDistance;
    }
    const response = await axios.get(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${source.latitude},${source.longitude}&destinations=${destination.latitude},${destination.longitude}&travelMode=driving&key=${key}`);
    const secondDistance = response.data && response.data.resourceSets[0].resources[0].results[0].travelDistance;
    return firstDistance + secondDistance;
}

async function asyncFilter(arr, callback) {
    const fail = Symbol()
    return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
}

const changeOrderStatus = async (orderId, status) => {
    return await Order.findByIdAndUpdate(orderId, {
        status
    }, {
        new: true
    })
}



module.exports = {
    getDistance,
    asyncFilter,
    changeOrderStatus
}