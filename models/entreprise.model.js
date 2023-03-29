const mongoose=require('mongoose');
const entrepriseSchema=new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    pdg:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    telephone:{
        type:Number,
        required:true
    },
    adresse:{
        type:String,
        required:true

    }
},{
    timestamps:true
})

module.exports=mongoose.model('Entreprise',entrepriseSchema);