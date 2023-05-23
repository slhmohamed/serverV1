const express=require('express')
const router=express.Router()
const {addEntreprise,getAll,deleteEntreprise,searchCompany,getSingle,updateEntreprise}=require('../controller/entreprise.controller')
router.post('/addEntreprise',addEntreprise)
router.get('/getAll',getAll)
router.delete('/deleteEntreprise/:id',deleteEntreprise)
router.get('/searchCompany/:key',searchCompany)
router.get('/getSingle/:id',getSingle)

router.put('/updateEntreprise/:id',updateEntreprise)

module.exports=router 