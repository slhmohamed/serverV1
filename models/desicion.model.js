 const mongoose = require("mongoose");



const DesicionSchema = new mongoose.Schema({
    dateLancement: {type:Date},
    responsable: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sujet: {type:String},
    dateExecution: {type:Date},
    status:{
        type:String 
    }
    
  }, {timestamps:true});
  
  module.exports=mongoose.model('Desicion', DesicionSchema);
  