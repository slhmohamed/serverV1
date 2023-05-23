const express=require('express')
const router=express.Router();
const {getAlllog}=require('../controller/log.controller');

 
router.get('/getAlllog',getAlllog)
 
module.exports=router