const mongoose = require('mongoose')
const User = require('./user')

const ProductOwnerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
    marketName: { type: String, required: true },
    ownerName: { type: String, required: true },
    marketPhone: { type: String, required: true, mathc: '(01)[0-9]{9}' },
    reports: [{
        message:  { type: String, required: [true, 'You have to add report message'] },
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: [true, 'Provide User who submitted the report'] 
        },
        createdAt: { type: Date, default: Date.now() }
    }],
})

module.exports= mongoose.model('ProductOwner',ProductOwnerSchema)