const mongoose = require('mongoose')
const User = require('./user')

const ProductOwnerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
    marketName: { type: String, required: true },
    ownerName: { type: String, required: true },
    marketPhone: { type: String, required: true, mathc: '(01)[0-9]{9}' }
})

module.exports= mongoose.model('ProductOwner',ProductOwnerSchema)