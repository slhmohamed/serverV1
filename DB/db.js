const mongoose=require('mongoose');

const connection=async()=>{
    try{
        const db=await mongoose.connect(process.env.MONGOURL);
        console.log('Mongo DB connected');
    }
    catch (error){
        console.log(error);
        process.exit(1);

    }
}
module.exports=connection;