 
const Event = require("../models/event.model");
 
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
               
            res.status(200).send({data:newEvent})
                 
            
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
  event.save();
 res.status(200).send({  message: 'desicion updated' })
  
 }
