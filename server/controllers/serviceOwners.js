const { pushNotification } = require('./controller');
const { Order, ServiceOwner, User } = require('./../models/allModels');
const { getDistance, asyncFilter } = require('./controller');
const productOwner = require('../models/productOwner');

// Get all service owner orders
const allIncomingOrders = (req, res) => {
    const { user } = req;

    Order.find({service: user._id})
    .sort({_id: 'desc'})
    .populate('customer')
    .then(orders => {
        res.status(200).json(orders);
    })
    .catch(error => res.status(500).end());
}

const changeStatus = async(req,res)=>{
    try{
        const serviceUser = await ServiceOwner.findOne({user : req.user._id})
        const user = await User.updateOne({_id:serviceUser.user._id},{$set:{"status":"online"}},{new:true})
        console.log(user);
        res.json({
            user
          });
}catch(err){
    console.error(err.message);
}
    
}

const getServiceOwner = async(req,res)=>{
    try{
        console.log(req.user._id);
        let user =await ServiceOwner.findOne({user: req.user._id})
        .populate('user');
        res.send(user)
        }
        catch(err){
            res.send(err);
            console.log(err);
        }
}
const updateServiceOwner = async(req,res)=>{
    
    console.log(req.body.distance);
    // const serviceOwnerId = req.params.id;
    const url = req.protocol + '://' + req.get('host')
    // const image = req.file && req.file.path;
    let image_path = url + '/public/uploads/users/images/' +req.file.filename ;
    console.log(req.file);
    // let {image_path,...owner}=req.body;
    try{
    let service = 
    await ServiceOwner.findOneAndUpdate({user: req.user._id},{$set:req.body},{new: true}).populate('user')
    await User.findOneAndUpdate({_id:service.user._id},{'avatar':image_path})
    let newServiceObj = await (await ServiceOwner.findOne({user:req.user._id})).populate('user')
    res.status(200).json({"data": newServiceObj});
}catch(err) {
        console.log(err);
        res.status(400).json({"error": err});
    }
} 

const getAllConnectedServiceOwner = (req,res)=>{
    try{
    ServiceOwner.find({'productOwner.status': 'connected'}).populate('user')
    res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(400).json({err});
    }
}

const getProductOwnerDetails = async(req,res)=>{
    try{
        const productUser = await ServiceOwner.findOne({'productOwner.status': 'connected'})
        const userData = await User.findOne({_id:productUser.user._id}).populate('user')
        console.log(userData);
        res.json({
            userData
          });
}catch(err){
    console.error(err.message);
}
}
// Get service owner reviews
const reviews = (req, res) => {
    let {id}= req.params
  
    !id ? id  = req.user._id:""
    const perPage = req.query.page ? 8 : null; // Reviews per page
    const page = perPage ? parseInt(req.query.page) : 0; // Check if there is a query string for page number

    ServiceOwner.findOne({ user: id }, null, { skip: perPage * (page-1), limit: perPage })
    .sort({_id: 'desc'})
    .populate('user')
    .populate('rates.order')
    .populate('rates.user')
    .then(owner => {
        
        const count = owner.rates ? owner.rates.length : 0;

        const data = perPage ? {
            // return review data with current page number and all pages available
            reviews: owner.rates,
            page,
            pages: parseInt(count/perPage)+1 // Count number of available pages
        } 
        : 
        {reviews: owner.rates};

        res.status(200).json(data);
    })
    .catch(error => console.log(error));
}

// Get all service owners
const all = (req, res) => {
    const perPage = req.query.page ? 8 : null; // Service owners per page
    const page = perPage ? parseInt(req.query.page) : 0; // Check if there is a query string for page number

    ServiceOwner.find({}, null, { skip: perPage * (page-1), limit: perPage })
    .populate('user')
    .populate('reports.user')
    .then(owners => {
        ServiceOwner.countDocuments().exec((err, count) => {
            if (err) res.status(500).end();

            const data = perPage ? {
                // return service owner data with current page number and all pages available
                owners,
                page,
                pages: parseInt(count/perPage)+1 // Count number of available pages
            } : owners;

            res.status(200).json(data);
        });
    })
    .catch(error => res.status(500).end());
}

// Get all unconnected service owners
const allIdle = (req, res) => {
    const perPage = req.query.page ? 8 : null; // Service owners per page
    const page = perPage ? parseInt(req.query.page) : 0; // Check if there is a query string for page number

    ServiceOwner.find({'productOwner.status': 'Not connected'}, null, { skip: perPage * (page-1), limit: perPage })
    .populate('user')
    .then(owners => {
        ServiceOwner.countDocuments().exec((err, count) => {
            if (err) res.status(500).end();

            const data = perPage ? {
                // return service owner data with current page number and all pages available
                owners,
                page,
                pages: parseInt(count/perPage)+1 // Count number of available pages
            } : owners;

            res.status(200).json(data);
        });

        res.status(200).json(data);
    })
    .catch();
}

const updateConnection = (req, res) => {
    const { status } = req.params;
    const { user } = req;
    
    ServiceOwner.findOneAndUpdate({user: user._id}, {
        'productOwner.status': status === 'accept' ? 'Connected' : 'Not connected'
    }, { new: true })
    .populate('productOwner.user')
    .then(owner => {
        const info = { 
            title: status === 'accept' ? 'Connection accepted' : 'Connection rejected' ,
            message: status === 'accept' ? `User ${req.user.name} accepted your connection request` : `User ${req.user.name} canceled connection with you`,
            link: req.user.role === 'serviceowner' ? 'http://localhost:3000/product-owner/connections' : 'http://localhost:3000/service-owner/connection',
            body: owner
        }

        if(req.user.role === 'productowner'){
            pushNotification(owner.user.email, info);
        }else if(req.user.role === 'serviceowner'){
            pushNotification(owner.productOwner.user.email, info);
        }
        res.status(200).json({status: owner.productOwner.status})
    })
    .catch(error => res.status(500).end());
}

const remove = (req, res) => {
    const { id } = req.params;

    ServiceOwner.findOneAndDelete({user: id})
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

// Add new category


//service owner can view his ratings
// const viewRatings = async(req,res)=>{
//     try{
//         const userRate = await ServiceOwner.findOne({_id : req.params.id}) 
//         res.status(200).json(data);
//     }catch(err){
//         console.log(err);
//         res.status(400).json({err});
//     }   
// }


//filter delivery service owner

const availableServiceOwners = async ({ body }) => {
    const { from, to } = body;
    const owners = await ServiceOwner.find({ }).populate({
        path: 'user',
        match: { status: 'online' }
    });

    return await asyncFilter(owners, async owner => {
        if (owner.user != null) {
            console.log(owner);
            const location = owner.user.address.length != 0 ? owner.user.address[0].location : null;
            const distance = await getDistance(from, to, location);
            return owner.distance >= distance;
        }
    });
};

const filteredServiceOwners = (req, res) => {
    availableServiceOwners(req).then(owners => {
        res.status(200).json(owners);
    });
}

//create notification for filtered service owner of a new product
const deliverNewProduct = (req, res) => {
    const order = req.body;
    const serviceOwnerId = order.id;
    ServiceOwner.findById(serviceOwnerId).then(owner => {
        const availableUsers = filteredServiceOwners();
        let newOrder = new Order({
            customer: req.user._id,
            targetedServiceOwners: targetedServiceOwners.push(availableUsers),
            ...order,
            cost: 0,
            amount: 0
        });

        newOrder.save().then(order => {
            
            res.status(200).json(order);
        }).catch(error => console.log(error));
    })
}

const getPendingOrdersOfConnectedProductOwner=(req,res)=>{
    const order = req.body;
    const serviceOwnerId =req.user._id;
    try{
        const connectedProductOwners= productOwner.find()
        Order.find({ 'products.product': { $in: array } }, function (err, result) {
            result = result.map(function (document) {
              return document.value;
            });
          });

    }catch(e){
        
    }
}

module.exports = {
    allIncomingOrders,
    reviews,
    all,
    allIdle,
    updateConnection,
    remove,
    getServiceOwner,
    updateServiceOwner,
    changeStatus,
    getAllConnectedServiceOwner,
    getProductOwnerDetails,
    filteredServiceOwners,
    deliverNewProduct
}