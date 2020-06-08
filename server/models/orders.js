const mongoose = require('mongoose')
const validator = require('validator');

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceOwner" },
    status: { type: String, required: true },
    from: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        area: { type: String, required: true }
    },
    to: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        area: { type: String, required: true }
    },
    amount: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Order', orderSchema)