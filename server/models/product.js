const mongoose = require('mongoose')
const ProductOwner = require('./user')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref:"ProductOwner"},
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image_path: {
        type: String,
        required: true
    },
    category: { type: String, required: true }

})

module.exports= mongoose.model('Product', productSchema)