const PV = require("../models/pv.model");


exports.newPV = async (req, res) => {
    try {
        const newPV = new PV({
            rapport: req.file.path,
            date: req.body.date,
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
    try {
        let updateObj = {}



        updateObj = {
           // responsable: req.body.responsable,
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
 

 


