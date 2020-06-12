const mongoose = require('mongoose')
const User = require('./user')

const serviceOwnerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
    distance: { type: Number, required: true },
    region: { type: Number, required: true },
    transportation: { type: String, required: true}
})

module.exports= mongoose.model('ServiceOwner', serviceOwnerSchema)