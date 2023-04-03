const express=require('express');
const router=express.Router()
const {signin,forgotPasswordController,resetPasswordController}=require('../controller/auth.controller')
router.post("/login",signin)
router.post("/forgetPassword",forgotPasswordController)
router.post("/resetPassword",resetPasswordController)

module.exports=router