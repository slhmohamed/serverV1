const router=require('express').Router();
const {newPV,getAllPV,getPV}=require('../controller/pv.controller')
const multerInstance = require("../middleware/rapport")

router.post('/newPV',multerInstance.upload.single('rapport'),newPV)
router.get('/getAllPV/:id',getAllPV)
router.get('/getPV/:id',getPV) 

module.exports=router