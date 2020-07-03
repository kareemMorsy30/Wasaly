const mongoose = require('mongoose')

const rate = new mongoose.Schema({
    rating: {
        type: Number,
        min: [1, 'Minimum rating is 1'],
        max: [5, 'Maximum rating is 5'],
        default: 1
    },
    reviews: [{
        review: {type: String,default: null},
        createdAt: { type: Date, default: new Date() }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,       
        ref: 'User'
    },
    order:{  type: mongoose.Schema.Types.ObjectId, ref: 'Order'}
});

const serviceOwnerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
    distance: { type: Number, required: true },
    region: { type: String, required: true },
    transportation: { type: String, required: true},
    rating: {type: Number, default: 0},
    rates: [rate],
    reports: [{
        message:  { type: String, required: [true, 'You have to add report message'] },
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: [true, 'Provide User who submitted the report'] 
        },
        createdAt: { type: Date, default: new Date() }
    }],
    productOwner: { 
        status: { 
            type: String,  
            enum: ['Not connected', 'Pending', 'Connected'], 
            default: "Not connected"
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
    }
})

module.exports= mongoose.model('ServiceOwner', serviceOwnerSchema)
