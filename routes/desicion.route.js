const router=require('express').Router();
const {newDesicion,getAll,getDesicion,updateDesicion,getDesicions,getSingle}=require('../controller/desicion.controller')

router.post('/newDesicion',newDesicion)
router.get('/getAll',getAll)
router.get('/getDesicion/:id',getDesicion)
router.put('/updateDesicion/:id',updateDesicion)
router.get('/getDesicions/:param',getDesicions)
router.get('/getSingle/:id',getSingle)

module.exports=router