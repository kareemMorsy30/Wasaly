const mongoose = require('mongoose');
const Product = require('./product')
const ServiceOwner = require('./serviceOwner')
const User = require('./user')
const { controller } = require('../controllers/allControllers')
const { io } = require("../server");
const service = require('../controllers/service');
const serviceOwner = require('../config/serviceOwner');
const { Order } = require('./allModels');
const { serviceOwnerRouter } = require('../routes/allRoutes');

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
    },
    productOwners: [
        {
            productOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            serviceOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            status: {
                type: String,
                enum: ['Pending', 'Canceled', 'Accepted', 'Rejected', 'Out for delivery', 'Delivered'],
                default: "Pending"
            }
        }
    ]
})

orderSchema.pre('save', function (next) {

    if (this.productOwners.length < 1) {

        let productInf
        let serviceOwners
        let services = []
        let productOwners = []
        try {
            this.products.forEach(async product => {
                productInf = await Product.findById(product.product).populate({ path: 'owner', populate: { path: 'user' } }).select('owner.user')
                serviceOwners = await ServiceOwner.find({ 'productOwner.user': productInf.owner.user, 'productOwner.status': 'Connected' }).populate('user')

                if (!productOwners.includes(productInf.owner.user)) {
                    productOwners.push(productInf.owner.user)
                    this.productOwners.push({ productOwner: productInf.owner.user, status: 'Pending' })

                    let info = {
                        title: 'New Order',
                        message: `New order from customer`,
                        link: 'http://localhost:3000/product-owner/orders',
                        body: this
                    }

                    User.findOneAndUpdate({ _id: productInf.owner.user }, { $push: { notifications: info } })
                        .then(user => {
                            io.sockets.in(`${user.email}`).emit('pushNotification', info);

                            next()
                        }).catch((e) =>
                            next(e)
                        )
                }

                let info = {
                    title: 'New Order',
                    message: `New order from ${productInf.owner.user.name}`,
                    link: 'http://localhost:3000/service-owner/product-orders',
                    body: this
                }

                serviceOwners.forEach((serviceOwner) => {
                    if (serviceOwner.user.status === "online" && !services.includes(serviceOwner.user.name)) {
                        services.push(serviceOwner.user.name)
                        this.targetedServiceOwners.push(serviceOwner.user)

                        User.findOneAndUpdate({ email: serviceOwner.user.email }, { $push: { notifications: info } })
                            .then(user => {
                                io.sockets.in(`${serviceOwner.user.email}`).emit('pushNotification', info);

                                next()
                            }).catch((e) =>
                                next(e)
                            )
                    }
                })


            })
            services = []
            productOwners = []

        } catch (e) {
            console.log(e)
        }
    }
    else next()
});


module.exports = mongoose.model('Order', orderSchema)