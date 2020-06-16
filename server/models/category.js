const mongoose = require('mongoose');
const Product = require('./product');

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    image: {
        type: String,
        default: null,
        required: [true, 'Category image is required']
    },
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
});


module.exports = mongoose.model('Category', categorySchema);