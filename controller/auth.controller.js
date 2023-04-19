const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
var _ = require('lodash');

 
const saltRounds = 10;

exports.signin = async (req, res) => {
  //check if user exist with email send for user 
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send({ errors: "Utilisateur introuvable avec cet email. veuillez réessayer" })
  }

  const compare = await bcrypt.compare(req.body.password, user.password)
  //compare password user and password send for user 
  if (!compare) {
    return res.status(400).json({
      errors: 'Email ou le mot de passe ne correspondent pas'
    });
  }
  // generate a token and send to client
  const token = jwt.sign({
    _id: user._id, email: user.email,role:user.role,username:user.nom +' ' + user.prenom
  },
    process.env.secretOrPrivateKey,
    {
      expiresIn: '7d'
    }
  )

  return res.status(200).send({ token: token })
}
exports.forgotPasswordController = async (req, res) => {
  try{
  const { email } = req.body;
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(400).json({
      error: 'User with that email does not exist'
    });
  }

  const token = jwt.sign(
    {
      _id: user._id
    },
    process.env.JWT_RESET_PASSWORD,
    {
      expiresIn: '10m'
    }
  );

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Password Reset link`,
    html: `
                      <h1>Please use the following link to reset your password</h1>
                      <p>${process.env.CLIENT_URL}/resetPassword/${token}</p>
                      <hr />
                      <p>This email may contain sensetive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `
  };

  const update = await user.updateOne({ resetPasswordLink: token })


  if (!update) {
    console.log('RESET PASSWORD LINK ERROR', err);
    return res.status(400).json({
      error:
        'Database connection error on user password forgot request'
    });
  } else {


    let transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      // true for 465, false for other ports 
      auth: { 
      user: "eventpfe74@gmail.com",
       pass: "pvcgubhwkrmnprsj" }
    });
    let info = await transporter.sendMail(mailOptions);
    if (info) {
      console.log('SIGNUP EMAIL SENT', info)
      return res.json({
        message: `Email has been sent to ${email}. Follow the instruction to activate your account`
      });
    }
    else {
      console.log(err);
      // console.log('SIGNUP EMAIL SENT ERROR', err)
      return res.json({
        message: err.message
      });

    }
  }

}catch(error){
  console.log(error);
  return res.status(400).send({ errors:error })
}



};

exports.resetPasswordController = async(req, res) => {
  try {
    console.log(req.body);
    const { resetPasswordLink, newPassword } = req.body;


    if (resetPasswordLink) {
     const verify= jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD) 
        if (!verify) {
          return res.status(400).json({
            error: 'Expired link. Try again'
          });
        }
        console.log(req.body.newPassword);
       var user=await User.findOne({resetPasswordLink:req.body.resetPasswordLink})
          
            if (!user) {
              return res.status(400).json({
                error: 'Something went wrong. Try later'
              });
            }
            const hashPassword = await bcrypt.hash(req.body.newPassword, saltRounds);

            const updatedFields = {
              password: hashPassword,
              resetPasswordLink: ''
            };

            user = _.extend(user, updatedFields);

          const save=await  user.save()  
              if (!save) {
                return res.status(400).json({
                  error: 'Error resetting user password'
                });
              }
              res.json({
                message: `Great! Now you can login with your new password`
              });
             
         
       
        }
  }
  catch (error) {
    console.log(error);
    return res.status(400).send({ errors: error })
  }
};