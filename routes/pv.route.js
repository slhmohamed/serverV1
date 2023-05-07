const router=require('express').Router();
const {newPV,getAllPV,getPV,deletePV,updatePV}=require('../controller/pv.controller')
const multerInstance = require("../middleware/rapport")

router.post('/newPV',multerInstance.upload.single('rapport'),newPV)
router.get('/getAllPV/:id',getAllPV)
router.get('/getPV/:id',getPV) 
router.delete('/deletePV/:id',deletePV)
router.put('/updatePV/:id',multerInstance.upload.single('rapportF'),updatePV)

module.exports=router