const mongoose = require('mongoose')


const reportSchema = new mongoose.Schema({
    report: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
    customer: { type: mongoose.Schema.Types.ObjectId, ref:"User"}
});
  
  
module.exports= mongoose.model('Report', reportSchema);