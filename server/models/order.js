const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    products:  [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        amount:  {type: Number, required: true}     
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
        // required: true
    },
    cost: {
        type: Number,
        // required: true
    },
    description: {
        type: String
    },
    rate:{
        rating:{ type: Number, default:0 },
        reviews:[{ type: String }]
    },
    phones: { type: String, mathc: '(01)[0-9]{9}' },

})


// orderSchema.pre('save', function(next){
//     let order = this 
//     if(order.isNew){
//         let cartTotal = 0
//         User.findOne({ _id: order.customer }).populate('products.product').then(function(user){
//             // console.log(user.cartLineItems)
//             user.products.forEach(function(user){
//                 let productData = {
//                     product: product.product._id,
//                     amount: product.amount,

//                 }
//                 console.log('====================================');
//                 console.log("Product Data",productData);
//                 console.log('====================================');
//                 order.products.push(productData)
//                 cartTotal += productData.amount
//                 console.log(cartTotal);
                
//             })
//             order.amount = cartTotal
//             next()
//         })
//         .catch(function(err){
//             return new Promise(function(resolve, reject){
//                 reject(err)
//             })
//         })
//     }else{
//         next()
//     }
// })


// orderSchema.post('save',function(next){
//     let order = this 
//         User.findByIdAndUpdate(order.customer, {$set: { 'products':  [] }}, {new: true}).then(function(user){
//             next()
//         })
//         .catch(function(err){
//             return Promise.reject(err)
//         })
//     })
module.exports = mongoose.model('Order', orderSchema)

