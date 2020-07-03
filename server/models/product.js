const mongoose = require('mongoose')
const ProductOwner = require('./user')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref:"ProductOwner"},
    category: { type: mongoose.Schema.Types.ObjectId, ref:"Category"},
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
    
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images_path: [{
        type: String,
        required: true
    }],
    description: { type: String, required: true, minlength: 5 }
})
productSchema.index({name: "text",owner:1},{"unique":true})
module.exports= mongoose.model('Product', productSchema)
// http://localhost:3000/categoryproducts/5ef22f89e8a8d609d7acb7ea