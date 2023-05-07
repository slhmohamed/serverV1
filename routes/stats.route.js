const router=require('express').Router();
const {statsController,chart}=require('../controller/stat.controller')
 
router.get('/getStats',statsController);
router.get('/chart',chart)
 

module.exports=router;