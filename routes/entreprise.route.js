const express=require('express')
const router=express.Router()
const {addEntreprise,getAll,deleteEntreprise}=require('../controller/entreprise.controller')
router.post('/addEntreprise',addEntreprise)
router.get('/getAll',getAll)
router.delete('/deleteEntreprise/:id',deleteEntreprise)

module.exports=router 