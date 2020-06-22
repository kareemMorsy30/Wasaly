const { ServiceOwner, productOwner, User } = require('../models/allModels');

const connect = (req, res) => {
    const { serviceOwnerId } = req.body;

    ServiceOwner.findByIdAndUpdate(serviceOwnerId, {
        productOwner: {
            user: req.user._id,
            status: 'Pending'
        }
    }, {
        new: true
    }).populate('user')
    .then(owner => res.status(200).json(owner))
    .catch(error => res.status(500).end());
}

const disconnect = (req, res) => {
    const { serviceOwnerId } = req.body;

    ServiceOwner.findByIdAndUpdate(serviceOwnerId, {
        productOwner: {
            user: req.user._id,
            status: 'Not connected'
        }
    }, {
        new: true
    }).populate('user')
    .then(owner => res.status(200).json(owner))
    .catch(error => res.status(500).end());
}

// Retrieve product owners request details
const productOwnerDetails = (req, res) => {
    const { user } = req;
    ServiceOwner.findOne({user: user._id})
    .populate('productOwner.user')
    .then(owner => {
        if(owner.productOwner.status === 'Not connected'){
            res.status(200).json({status: owner.productOwner.status});
        }else{
            res.status(200).json(owner);
        }
    })
    .catch(error => res.status(500).end());
}

const getAllproductsOwner = async(req,res)=>{
    try{
        let productuser =await productOwner.find()
        console.log(productuser);
        res.send(productuser)
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

const getProductOwner = async(req,res)=>{
    try{
        let productuser =await productOwner.findById({_id: req.params.id})
        res.send(productuser)
        }
        catch(err){
            res.send(err);
            console.log(err);
        }
}
const changeStatus = async(req,res)=>{
    try{
        const productuser = await productOwner.findOne({_id : req.params.id})
        const user = await User.updateOne({_id:productuser.user._id},{$set:{"status":"online"}},{new:true})
        console.log(user);
        console.log('hello');
        res.json({
            user
          });
}catch(err){
    console.error(err.message);
}
    
}
const updateProducteOwner = (req,res)=>{
    productOwner.findOneAndUpdate({_id: req.params.id},req.body,{new: true},(error,user)=>{
        res.status(200).json({"data": user});
    }).catch((err) => {
        console.log(err);
        res.status(400).json({"error": err});
    })
} 
module.exports = {
    connect,
    disconnect,
    productOwnerDetails,
    getAllproductsOwner,
    getProductOwner,
    changeStatus,
    updateProducteOwner
}