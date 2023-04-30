const express=require('express')
const router=express.Router();
const {getAll,getShow,updateEvent,saveEvent,deleteEvent,addComment}=require('../controller/event.controller');

router.post('/saveEvent',saveEvent)
router.get('/getAll',getAll)
router.get('/getShow/:id',getShow)
router.delete('/deletEvent/:id',deleteEvent)
router.put('/updateEvent/:id',updateEvent)
router.post('/addComment',addComment)
module.exports=router