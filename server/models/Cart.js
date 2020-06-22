const mongoose = require('mongoose')
const ProductOwner = require('./user')

const cartSchema = new mongoose.Schema({
    products: [{
         product: {type: mongoose.Schema.Types.ObjectId, ref: "Product" },
         amount:  {type: Number, required: true}     
    }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})
module.exports = mongoose.model('Cart', cartSchema)