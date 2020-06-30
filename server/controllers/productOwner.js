const { pushNotification } = require('./controller');
const { ServiceOwner, productOwner, User } = require('../models/allModels');
const { populate } = require('../models/user');
const Order = require('../models/order')
const ProductOwner = require('../models/productOwner')

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

            if (req.user._id.toString() !== owner.user._id.toString()) {
                pushNotification(owner.user.email, info);
            } else {
                pushNotification(owner.productOwner.user.email, info);
            }

            res.status(200).json(owner);
        })
        .catch(error => res.status(500).end());
}

const remove = (req, res) => {
    const { id } = req.params;

    productOwner.findOneAndDelete({ user: id })
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
    ServiceOwner.findOne({ user: user._id })
        .then(owner => {
            if (owner.productOwner.status === 'Not connected') {
                res.status(200).json({ status: owner.productOwner.status });
            } else {
                console.log(owner.productOwner.user);
                productOwner.findOne({ user: owner.productOwner.user })
                    .populate('user')
                    .then(market => {
                        res.status(200).json({ market: market, status: owner.productOwner.status });
                    })
            }
        })
        .catch(error => res.status(500).end());
}

const getAllproductsOwner = async (req, res) => {
    try {
        let productuser = await productOwner.find().populate('user').populate('reports.user')
        console.log(productuser);
        res.send(productuser)
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

const getProductOwner = async (req, res) => {
    try {

        let productuser = await productOwner.findOne({ user: req.user._id })
            .populate('user');

        res.send(productuser)
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}
const changeStatus = async (req, res) => {
    try {
        const productuser = await productOwner.findOne({ user: req.user._id })
        const user = await User.updateOne({ _id: productuser.user._id }, { $set: { "status": "online" } }, { new: true })
        console.log(user);
        console.log('hello');
        res.json({
            user
        });
    } catch (err) {
        console.error(err.message);
    }

}
const updateAddress = async(req,res)=>{
    try{
        // let productUser = await productOwner.findOneAndUpdate({ user: req.user._id }, { $set: req.body }, { new: true }).populate('user')
        await User.findOneAndUpdate({ _id: req.user._id }, {address:req.body.address},{new:true})
        let newServiceObj = await productOwner.findOne({ user: req.user._id }).populate('user')
            res.status(200).json({ "data": newServiceObj });
            console.log("body",req.body)
            console.log("2ndadres",req.user.address);
            console.log("user",req.user._id);
            console.log("address",newServiceObj.user.address);
        }catch (err) {
            console.log(err);
            res.status(400).json({ "error": err });
        }
}
const updateProducteOwner = async (req, res) => {
    // productOwner.findOneAndUpdate({_id: req.params.id},req.body,{new: true},(error,user)=>{
    //     res.status(200).json({"data": user});
    // }).catch((err) => {
    //     console.log(err);
    //     res.status(400).json({"error": err});
    // })
    const url = req.protocol + '://' + req.get('host')
    let image_path = url + '/public/uploads/users/images/' + req.file.filename;
    console.log(req.file);
    try {
        let product =
            await productOwner.findOneAndUpdate({ user: req.user._id }, { $set: req.body }, { new: true }).populate('user')
        await User.findOneAndUpdate({ _id: product.user._id }, { 'avatar': image_path })
        let newProductObj = await (await productOwner.findOne({ user: req.user._id })).populate('user')
        res.status(200).json({ "data": newProductObj });
    } catch (err) {
        console.log(err);
        res.status(400).json({ "error": err });
    }
}
//get all orders for the product owner
const getProductOwnerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ 'productOwners.productOwner': req.user._id }).sort({createdAt: 'desc'}).populate('customer', 'name').exec()
        res.status(200).json(orders)
    } catch (e) {
        console.log(e)
        res.status(400).send('No Orders')
    }

}
//change the status of product Owners'
const changeProductsStatus = async (req, res) => {
    const productOwnerId = req.user._id;
    const { orderId } = req.params
    const { status } = req.body
    try {
        const productOwner = await ProductOwner.findOne({ user: productOwnerId }).exec()
        let order = await Order.findOne({ _id: String(orderId),  'productOwners.productOwner': productOwnerId }).exec()
        let allIsDelievered = true
        order.productOwners.forEach((productOw) => {
            if (String(productOw.productOwner) === String(productOwnerId)) {
                productOw.status = status
            }           
            if (productOw.status === 'Pending') allIsDelievered = false
        })
        if (allIsDelievered) order.status = "Out for delivery"
        order.save()
        res.status(200).json("Order is Updated Successfully")
    } catch (e) {
        res.status(300).send('Error Accepting the order')
    }

}


module.exports = {
    connect,
    disconnect,
    productOwnerDetails,
    remove,
    getAllproductsOwner,
    getProductOwner,
    changeStatus,
    updateProducteOwner,
    getProductOwnerOrders,
    changeProductsStatus,
    updateAddress
}