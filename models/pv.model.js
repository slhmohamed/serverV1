const mongoose = require("mongoose");



const PvSchema = new mongoose.Schema({
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    sujet: {type:String},
     rapport:{type:String},
    rapportFinale:{type:String,default:''}
  
    
  }, {timestamps:true});
  
  module.exports=mongoose.model('Pv', PvSchema);
  