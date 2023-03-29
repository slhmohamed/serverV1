const express=require('express')
const router=express.Router()
const {addEntreprise,getAll}=require('../controller/entreprise.controller')
router.post('/addEntreprise',addEntreprise)
router.get('/getAll',getAll)

module.exports=router 