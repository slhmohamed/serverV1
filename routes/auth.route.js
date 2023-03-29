const express=require('express');
const router=express.Router()
const {signin}=require('../controller/auth.controller')
router.post("/login",signin)

module.exports=router