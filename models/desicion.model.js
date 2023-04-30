 const mongoose = require("mongoose");



const DesicionSchema = new mongoose.Schema({
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    responsable: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sujet: {type:String},
    date: {type:Date},
    status:{
        type:String,
        default:'Pas encore'
    }
    
  }, {timestamps:true});
  
  module.exports=mongoose.model('Desicion', DesicionSchema);
  