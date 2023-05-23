 
const Event = require("../models/event.model");
 const User=require('../models/user.model');
 const nodemailer=require('nodemailer')
 const Log = require("../models/log.model");

exports.getAll= async(req, res)=>{

    const events = await Event.find({});
 
    try{
       
       res.status(200).send({data:events})

      
    }catch(err){
     res.status(400).send({errors:err})
    }
};

exports.getShow= async(req, res)=>{
    const id =   req.params.id
    const event = await Event.findById(id) .populate({ path: "remarque.sender", select: "nom prenom" })
 
    try{
       res.status(200).send({data:event})

      
    }catch(err){
        res.status(400).send({errors:err})
    }
}


 exports.saveEvent= async(req, res)=>{
   
        const newEvent = await new Event(req.body)
     
        try{
           await newEvent.save()
           const users=await User.find();
           const mailOptions = {
            from: 'pfemayssa@gmail.com',
            to: users,
            subject: `New event`,
            html: `
                              <h1>New event created : ${req.body.title}</h1>
                              <p>Start in :${req.body.start}/resetPassword/${token}</p>
                              <hr />
                               
                          `
          };
        
           
               
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use TLS
            auth: {
                user: 'pfemayssa@gmail.com',
                pass: 'denfbsivunbtualr'
            }
        });
        const newLog=new Log({
          action:'Un Event a été créée.'
      })
          let info = await transporter.sendMail(mailOptions);
          if (info) {
            console.log('SIGNUP EMAIL SENT', info)
            return res.json({
              message: `Event has been created and Email has been sent to all users .`
            });
          }
          else {
            console.log(err);
            // console.log('SIGNUP EMAIL SENT ERROR', err)
            return res.json({
              message: err.message
            });
      
          }
                 
            
        }catch(err){
            console.log(err);
            res.status(400).send({errors:err})
        }
    }




exports.updateEvent= async (req, res)=>{
    const id = req.params.id
     try{
        const event = await Event.findOne({_id : id})
        if(event){
            Object.assign(event, req.body);
             event.save()
                    res.status(200).json(event)
                }
        
     
       
     }catch (err){
       console.log(err)
       res.status(400).send({errors:err})
     }
 
    }
exports.deleteEvent= async(req, res)=>{
    const id = req.params.id;
    try{
        await Event.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    }catch(err){
        res.status(400).send({errors:err})
    }

}
exports.addComment=async(req,res)=>{

    let obj={
    sender:req.body.sender,
     comment:req.body.comment
    }
    
 let event=await Event.findById(req.body.eventId);
 
 event?.remarque.push(obj)
 console.log(event);
  event.save();
 res.status(200).send({  message: 'desicion updated' })
  
 }
