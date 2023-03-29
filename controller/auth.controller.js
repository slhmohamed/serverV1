const User=require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
exports.signin=async(req,res)=>{
//check if user exist with email send for user 
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.satus(400).send({errors:"user not found with this email.Please try again"})
    }

    const compare=await bcrypt.compare(req.body.password,user.password)
//compare password user and password send for user 
    if(!compare){
        return res.status(400).json({
            errors: 'Email and password do not match'
          });
    }
    // generate a token and send to client
    const token =jwt.sign({
        _id:user._id,email:user.email
    },
    process.env.secretOrPrivateKey,
    {
        expiresIn: '7d'
      }
      )

   return   res.status(200).send({token:token})
}