const Desicion = require("../models/desicion.model");
const Log = require("../models/log.model");
exports.newDesicion = async (req, res) => {
    try {
        const newDesicion = new Desicion({
            responsable: req.body.responsable,
            dateLancement: req.body.dateLancement,
            sujet: req.body.sujet,
           status:req.body.status,
           dateExecution: req.body.dateExecution,

        })
        const newLog=new Log({
            action:'Un desicion a été créée.'
        })
        newLog.save()
        await newDesicion.save();
        res.status(200).send({ message: 'Desicion ajouté' })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}

 
exports.getAll = async (req, res) => {
    const desicions = await Desicion.find()
        .populate({ path: "responsable", select: "nom prenom" })
         
    res.status(200).send({ data: desicions })
}

exports.getDesicion = async (req, res) => {
    const desicion = await Desicion.findById(req.params.id)
        .populate({ path: "responsable", select: "nom prenom" })
 
    res.status(200).send({ data: desicion })
}

exports.updateDesicion = async (req, res) => {
    try {
        let updateObj = {}



        updateObj = {
            responsable: req.body.responsable,
            date: req.body.date,
            sujet: req.body.sujet,
            status:req.body.status
        }

        const result = await Desicion.findByIdAndUpdate(req.params.id, { $set: updateObj })
        res.status(200).send({ data: result, message: 'desicion updated' })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.getDesicions = async (req, res) => {
    console.log(req.params.param);
    if(req.params.param=='Tous')
    {
    const desicions = await Desicion.find()
        .populate({ path: "responsable", select: "nom prenom" })
 
    res.status(200).send({ data: desicions })
}else{
    const desicions = await Desicion.find({status:req.params.param})
    .populate({ path: "responsable", select: "nom prenom" })
 
res.status(200).send({ data: desicions })
}
}

exports.getSingle=async(req,res)=>{
    console.log(req.params.id);
    const desicion = await Desicion.find()
    .populate({ path: "responsable", select: "nom prenom" })
res.status(200).send({ data: desicion })
}

exports.updateStatus=async(req,res)=>{
    try {
        let updateObj = {}
console.log(req.body);


        updateObj = {
            status: req.body.value,
           
        }

        const result = await Desicion.findByIdAndUpdate(req.params.id, { $set: updateObj })
        res.status(200).send({ data: result, message: 'desicion updated' })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}


 