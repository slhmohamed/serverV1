const PV = require("../models/pv.model");


exports.newPV = async (req, res) => {
    try {
        const newPV = new PV({
            rapport: req.file.path,
            
            sujet: req.body.sujet,
            event: req.body.event
        })
        console.log(newPV);
        await newPV.save();
        res.status(200).send({ message: 'PV ajouté' })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}

 

exports.getAllPV = async (req, res) => {
    const pvs = await PV.find({event:req.params.id})
         
    res.status(200).send({ data: pvs })
}

exports.getPV = async (req, res) => {
    const pv = await PV.findById(req.params.id)

    res.status(200).send({ data: pv })
}

exports.updatePV = async (req, res) => {

    console.log(req.file.path);
    try {
        let updateObj = {}



        updateObj = {
           // responsable: req.body.responsable,
 
             rapportFinale: req.file.path
        }

        const result = await PV.findByIdAndUpdate(req.params.id, { $set: updateObj })
        res.status(200).send({ data: result, message: 'pv updated' })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}

exports.deletePV = async (req, res) => {
    try {
        const deletePV = await PV.findOneAndRemove(req.params.id);
        res.status(200).send({ message: "PV deleted" });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
 

 


