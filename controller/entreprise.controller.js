const Entreprise=require('../models/entreprise.model')
const Log = require("../models/log.model");

exports.addEntreprise=async(req,res)=>{
    const existe=await Entreprise.findOne({email:req.body.email})
    if(existe){
        return res.status(400).send({errors:'Email already exist'})
    }
    const entreprise=new Entreprise(req.body);

    const result=await entreprise.save();
    const newLog=new Log({
        action:'Un entreprise a été créée.'
    })
    newLog.save()
    return res.status(200).send({data:result,message:'Entreprise added'})
}
exports.getAll=async(req,res)=>{
    const listes=await Entreprise.find();

    res.status(200).send({data:listes})
}

exports.deleteEntreprise=async(req,res)=>{
    const id = req.params.id;
    try{
        await Entreprise.findByIdAndRemove(id)
        res.status(200).json("Company has been deleted");
    }catch(err){
        res.status(400).send({errors:err})
    }
}


exports.searchCompany=async(req,res)=>{
 
    const companys= await Entreprise.find()
    .or([{ nom: { $regex: req.params.key, $options: 'i' } }, 
    { pdg: { $regex: req.params.key, $options: 'i' } },
     { email: { $regex: req.params.key, $options: 'i' } },
     { adresse: { $regex: req.params.key, $options: 'i' } }
    
    ])
res.status(200).send({data:companys})
}

exports.getSingle=async(req,res)=>{

    const company=await Entreprise.findById(req.params.id);

    res.status(200).send({data:company})
}

exports.updateEntreprise=async(req,res)=>{
    try {
        let updateObj = {
       
            nom:req.body.nom,
            adresse:req.body.adresse,
            telephone:req.body.telephone,
            pdg:req.body.pdg,
            email:req.body.email
        }
    
        const result = await Entreprise.findByIdAndUpdate(req.params.id, { $set: updateObj })
        res.status(200).send({ data: result, message: 'Entreprise updated' })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
