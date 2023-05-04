require("dotenv").config();
    
 
const  connection = require("../DB/db"); 
const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;

 


let seedAdmin = async () => {
      let admins = await userModel.find({ role: "SuperAdmin"});
      console.log(admins.length);
      if(admins.length > 0){
         console.log("Admin user exist");
      } else {
        try{
            const hashPaswword = await bcrypt.hash('admin', saltRounds)
           let admin = new userModel({nom:'admin',prenom:'admin',telephone:'98765432',email: 'admin@gmail.com', password :hashPaswword, role: "SuperAdmin", createdAt: new Date(), updatedAt: new Date()  })
            
            await admin.save()
           console.log("Admin user added sucessfuly !");
        }catch(error){
          console.log("error : ", error);
        }
   }

  }

  let seed = async() => {
      await connection();
       
      await seedAdmin();
 
      process.exit(1);
  }

  seed();