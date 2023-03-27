const express=require('express')
const app=express();
const connection=require('./DB/db.js');
require('dotenv').config()
 connection();

 const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);

})
