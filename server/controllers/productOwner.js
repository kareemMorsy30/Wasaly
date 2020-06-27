const { pushNotification } = require('./controller');
const { ServiceOwner, productOwner, User } = require('../models/allModels');
const { populate } = require('../models/user');

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
    .then(owner => {
        const info = { 
            title: 'New connection request',
            message: `Product owner ${req.user.name} sent a connection request to you`,
            link: 'http://localhost:3000/service-owner/connection',
            body: owner
        }
        pushNotification(owner.user.email, info);
        res.status(200).json(owner);
    })
    .catch(error => res.status(500).end());
}

const disconnect = (req, res) => {
    const { serviceOwnerId } = req.body;

    ServiceOwner.findByIdAndUpdate(serviceOwnerId, {
        productOwner: {
            user: req.user._id,
            status: 'Not connected'
        }
    }).populate('user')
    .populate('productOwner.user')
    .then(owner => {
        const info = { 
            title: 'User disconnected',
            message: `User ${req.user.name} has disconnected with you`,
            link: req.user.role === 'serviceowner' ? 'http://localhost:3000/product-owner/connections' : 'http://localhost:3000/service-owner/connection',
            body: owner
        }

        if(req.user._id.toString() !== owner.user._id.toString()){
            pushNotification(owner.user.email, info);
        }else{
            pushNotification(owner.productOwner.user.email, info);
        }

        res.status(200).json(owner);
    })
    .catch(error => res.status(500).end());
}

const remove = (req, res) => {
    const { id } = req.params;

    productOwner.findOneAndDelete({user: id})
    .then(owner => {
        User.findByIdAndDelete(id)
        .then(user => res.status(200).json(user))
        .catch(error => {
            console.log(error);
            res.status(500).end()
        });
    })
    .catch(error => res.status(500).end());
}

// Retrieve product owners request details
const productOwnerDetails = (req, res) => {
    const { user } = req;
    ServiceOwner.findOne({user: user._id})
    .then(owner => {
        if(owner.productOwner.status === 'Not connected'){
            res.status(200).json({status: owner.productOwner.status});
        }else{
            console.log(owner.productOwner.user);
            productOwner.findOne({user: owner.productOwner.user})
            .populate('user')
            .then(market => {
                res.status(200).json({market: market, status: owner.productOwner.status});
            })
        }
    })
    .catch(error => res.status(500).end());
}

const getAllproductsOwner = async(req,res)=>{
    try{
        let productuser =await productOwner.find().populate('user').populate('reports.user')
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
    remove,
    getAllproductsOwner,
    getProductOwner,
    changeStatus,
    updateProducteOwner
}