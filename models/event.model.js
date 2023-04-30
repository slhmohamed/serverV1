const moment = require("moment");
const mongoose = require("mongoose");

const remarqueSchema=new mongoose.Schema({
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  comment: {type:String},
})
const EventSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Please write a title for your event"]},
    start: {
     type: Date,
     required: [true, "Please Insert The Start of your event" ],
     min: [new Date(), "can't be before now!!"],
    },
    end: {
     type: Date,
     //setting a min function to accept any date one hour ahead of start
     min: [function(){
       const date = new Date(this.start)
       const validDate = new Date(date.setHours(date.getHours()+1)) 
       return validDate
     },"Event End must be at least one hour a head of event time"],
    default: function(){
      const date = new Date(this.start)
      return date.setDate(date.getDate()+1)
    },
    },
    describe: { type: String},
 
    remarque:[remarqueSchema]
})


module.exports = mongoose.model("Event", EventSchema)