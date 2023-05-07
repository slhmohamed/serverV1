const express=require('express')
const router=express.Router();
const multerInstance = require("../middleware/file")
const {addUser,getAllUser,getSingleUser,deleteUser,updateUser,searchUser,updateAvatar,getAllUsers}=require('../controller/user.controller')
router.post('/addUser',addUser);
router.get('/getAll',getAllUser);
router.get('/getSingle/:id',getSingleUser)
router.delete('/deleteUser/:id',deleteUser)
router.put('/updateUser/:id',updateUser)
router.get('/searchUser/:key',searchUser)
router.put('/updateAvatar/:id',multerInstance.upload.single('file'),updateAvatar)
router.get("/allusers/:id", getAllUsers);

module.exports=router