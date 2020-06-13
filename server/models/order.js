const mongoose = require('mongoose')
const validator = require('validator');

const orderSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceOwner" },
    status: { 
        type: String, 
        enum: ['Pending', 'canceled', 'Accepted', 'Rejected', 'Out for delivery', 'Delivered'], 
        default: "Pending" 
    },
    from: {
        street: { type: String },
        city: { type: String },
        area: { type: String },
        longitude: { type: Number, required: true },
        latitude: { type: Number,  required: true },
    },
    to: {
        street: { type: String },
        city: { type: String },
        area: { type: String, required: true },
        longitude: { type: Number, required: true },
        latitude: { type: Number,  required: true },
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
    }
})

module.exports = mongoose.model('Order', orderSchema)