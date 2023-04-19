const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.addUser = async (req, res) => {
    try {
        const existe = await User.findOne({ email: req.body.email });
        if (existe) {
            return res.status(400).send({ message: "Email already exist" });
        }
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: hashPassword,
            telephone: req.body.telephone,
            role:req.body.role
        })
        await newUser.save();
        return res.status(200).send({ data: newUser, message: 'User added' })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.getAllUser = async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).send({ data: users })
}

exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        res.status(200).send({ data: user });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findOneAndRemove(req.params.id);
        res.status(200).send({ message: "User deleted" });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}
exports.updateUser = async (req, res) => {
    try {
        let updateObj = {}

        if (req.body.password != null) {
            const hashPaswword = await bcrypt.hash(req.body.password, saltRounds)
            updateObj = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                telephone: req.body.telephone,
                password: hashPaswword,
                role:req.body.role
            }
        } else {
            updateObj = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                telephone: req.body.telephone,
                role:req.body.role

            }
        }
        const result = await User.findByIdAndUpdate(req.params.id, { $set: updateObj })
        res.status(200).send({ data: result, message: 'Userd updated' })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ errors: error })
    }
}

exports.searchUser=async(req,res)=>{
 
    const users= await User.find()
    .or([{ nom: { $regex: req.params.key, $options: 'i' } }, { prenom: { $regex: req.params.key, $options: 'i' } }, { email: { $regex: req.params.key, $options: 'i' } }])
res.status(200).send({data:users})
}