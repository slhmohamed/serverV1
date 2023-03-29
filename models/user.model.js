const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({

    nom:{
        type:String,
        required:true
    },
    prenom:{
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
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema);