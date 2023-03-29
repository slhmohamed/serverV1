const Entreprise=require('../models/entreprise.model')

exports.addEntreprise=async(req,res)=>{
    const existe=await Entreprise.findOne({email:req.body.email})
    if(existe){
        return res.status(400).send({errors:'Email already exist'})
    }
    const entreprise=new Entreprise(req.body);

    const result=await entreprise.save();

    return res.status(200).send({data:result,message:'Entreprise added'})
}
exports.getAll=async(req,res)=>{
    const listes=await Entreprise.find();

    res.status(200).send({data:listes})
}