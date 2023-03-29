const express=require('express')
const router=express.Router();
const {addUser,getAllUser,getSingleUser,deleteUser,updateUser}=require('../controller/user.controller')
router.post('/addUser',addUser);
router.get('/getAll',getAllUser);
router.get('/getSingle/:id',getSingleUser)
router.delete('/deleteUser/:id',deleteUser)
router.put('/updateUser/:id',updateUser)
module.exports=router