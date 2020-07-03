const axios = require('axios');
const userModel = require('../models/user');
const { Order, ServiceOwner, User } = require('./../models/allModels');
const { io } = require("../server");

const getDistance = async (source, destination, location = null) => {

    try{
        const key = process.env.BING_KEY;
        console.log(key)
        console.log("========================================")
        let firstDistance = 0;
        if(location != null){
            const response = await axios.get(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${location.latitude},${location.longitude}&destinations=${source.latitude},${source.longitude}&travelMode=driving&key=${key}`);
            firstDistance = response.data && response.data.resourceSets[0].resources[0].results[0].travelDistance;
        }
        const response = await axios.get(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${source.latitude},${source.longitude}&destinations=${destination.latitude},${destination.longitude}&travelMode=driving&key=${key}`);
        const secondDistance = response.data && response.data.resourceSets[0].resources[0].results[0].travelDistance;
        return firstDistance + secondDistance;

    }catch(e){
        console.log(e)
    }
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
    }).populate('customer');
}

const pushNotification = (room, info) => {
    User.findOneAndUpdate({email: room}, {$push: {notifications: info}})
        .then(user => {
            io.sockets.in(`${room}`).emit('pushNotification', info);
        })
}

module.exports = {
    getDistance,
    asyncFilter,
    changeOrderStatus,
    pushNotification
}