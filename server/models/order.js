const mongoose = require('mongoose');
const Product = require('./product')
const ServiceOwner = require('./serviceOwner')
const User = require('./user')
const { controller } = require('../controllers/allControllers')
const { io } = require("../server");
const service = require('../controllers/service');

const orderSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        amount: { type: Number, required: true }
    }],
    productOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // service owner is a user
    targetedServiceOwners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
        type: String,
        enum: ['Pending', 'Canceled', 'Accepted', 'Rejected', 'Out for delivery', 'Delivered'],
        default: "Pending"
    },
    from: {
        street: { type: String },
        city: { type: String },
        area: { type: String, required: true },
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true },
    },
    to: {
        street: { type: String },
        city: { type: String },
        area: { type: String, required: true },
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true },
    },
    item: { type: String, required: true },
    amount: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    rate: {
        rating: { type: Number, default: 0 },
        reviews: [{ type: String }]
    }
})

orderSchema.post('save', function (doc, next) {
    console.log('jooooooooooooooooooooo')
    let productInf
    let serviceOwners

    this.products.forEach(async product => {


        productInf = await Product.findById(product.product).populate({ path: 'owner', populate: { path: 'user' } }).select('owner.user')
        serviceOwners = await ServiceOwner.find({ 'productOwner.user': productInf.owner.user }).populate('user')


        let info = {
            title: 'new order',
            message: `New order from ${productInf.owner.user.name}`,
            link: 'http://localhost:3000/orders',
            body: this
        }
        let services=[]
        serviceOwners.forEach((serviceOwner) => {            
            if (serviceOwner.user.status === "online" && !services.includes(serviceOwner.user.name) ){
                services.push(serviceOwner.user.name)
                console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii jhoppppppppp")

                User.findOneAndUpdate({ email: serviceOwner.user.email }, { $push: { notifications: info } })
                    .then(user => {
                        io.sockets.in(`${serviceOwner.user.email}`).emit('pushNotification', info);
                    })
            }
        })
        services=[]
    })
    next()
});


module.exports = mongoose.model('Order', orderSchema)