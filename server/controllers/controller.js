const axios = require('axios');
const userModel = require('../models/user');
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

const addUser = (req,res)=>{
    const {body : {name,role,username,email,password,address, phones}} = req;
    const user = new userModel({
        name,
        role,
        username,
        email,
        password,
        address,
        phones
    })
    user.save((err,user)=>{
        if(err) return res.send(err);
        res.json(user);
    })
}
const getAllUsers = async(req,res)=>{
    try{
        let user =await userModel.find()
        res.send(user)
    }catch(err){
        console.log(err);
        res.send(err);
    }
}
const getUser = async(req,res)=>{
    try{
    let user =await userModel.findById({_id: req.params.id})
    res.send(user)
    }
    catch(err){
        res.send(err);
        console.log(err);
    }

}
const updateUser = (req,res)=>{
    try{
    userModel.findOneAndUpdate({_id: req.params.id})
    res.status(200).json({"data": user});
    }catch(err){
        console.log(err);
        res.status(400).json({"error": err});
    }
}
const deleteUser = (req,res)=>{
    userModel.findById(req.params.id, function (err, user) {
        if (err) {
            next('cannot find the user');
        }
        user.deleteOne(function(err, user){
            if(err) console.log(err)
            else res.send(user)
        })
    });
}
module.exports = {
    getDistance,
    asyncFilter,
    addUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}