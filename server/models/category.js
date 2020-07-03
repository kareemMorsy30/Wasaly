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

// categorySchema.pre('save', function(next) {
//     const err = new Error('Category image is required');
//     // do stuff
//     if(!this.image) next(err);

//     next();
// });


module.exports = mongoose.model('Category', categorySchema);