const { Order, ServiceOwner,User } = require('./../models/allModels');

// Get all service owner orders
const allIncomingOrders = (req, res) => {
    const { user } = req;

    Order.find({service: user._id})
    .then(orders => {
        res.status(200).json(orders);
    })
    .catch(error => res.status(500).end());
}
const changeStatus = async(req,res)=>{
    try{
        const serviceUser = await ServiceOwner.findOne({_id : req.params.id})
        const user = await User.updateOne({_id:serviceUser.user._id},{$set:{"status":"online"}},{new:true})
        console.log(user);
        res.json({
            user
          });
}catch(err){
    console.error(err.message);
}
    
}
const getAllServiceOwners =(req,res)=>{
        ServiceOwner.find({}).then(services=>{
            console.log(services);
            res.status(200).json(services)
        })
    .catch(err=>{console.log(err);
        res.send(err);})
        
    
}
const getServiceOwner = async(req,res)=>{
    try{
        let user =await ServiceOwner.findById({_id: req.params.id})
        res.send(user)
        }
        catch(err){
            res.send(err);
            console.log(err);
        }
}
const updateServiceOwner = (req,res)=>{
    ServiceOwner.findOneAndUpdate({_id: req.params.id},req.body,{new: true},(error,user)=>{
        res.status(200).json({"data": user});
    }).catch((err) => {
        console.log(err);
        res.status(400).json({"error": err});
    })
}
module.exports = {
    allIncomingOrders,
    getAllServiceOwners,
    getServiceOwner,
    updateServiceOwner,
    changeStatus
}