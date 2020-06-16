const mongoose = require('mongoose')


const reportSchema = new Schema({
    report: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User"}
  });
  
  
  module.exports= mongoose.model('Report', reportSchema);