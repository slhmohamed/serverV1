const mongoose = require("mongoose");



const logSchema = new mongoose.Schema({
    action: {type: String},
   
  
    
  }, {timestamps:true});
  
  module.exports=mongoose.model('Log', logSchema);
  