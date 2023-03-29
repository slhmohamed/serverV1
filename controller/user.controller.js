const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.addUser = async (req, res) => {
    const existe = await User.findOne({ email: req.body.email });
    if (existe) {
        return res.status(400).send({ message: "Email already exist" });
    }
    const hashPassword =await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hashPassword,
        telephone: req.body.telephone
    })
    await newUser.save();
    return res.status(200).send({ data: newUser, message: 'User added' })
}
exports.getAllUser=async(req,res)=>{
    const users=await User.find();
    res.status(200).send({data:users})
}

exports.getSingleUser=async(req,res)=>{
    const user=await User.findById(req.params.id);
    res.status(200).send({data:user});
}
exports.deleteUser=async(req,res)=>{
    const deleteUser=await User.findOneAndRemove(req.params.id);
    res.status(200).send({message:"User deleted"});
}
exports.updateUser=async(req,res)=>{
    let updateObj={}
    
    if(req.body.password!=null){
        const hashPaswword=await bcrypt.hash(req.body.password,saltRounds)
         updateObj= {
            nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
            telephone:req.body.telephone,
            password:hashPaswword
        }
    }else{
         updateObj={
            nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
            telephone:req.body.telephone,
             
        }
    }
        const result=await User.findByIdAndUpdate(req.params.id , { $set: updateObj })
        res.status(200).send({data:result,message:'Userd updated'})
    
}