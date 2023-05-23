const User=require('../models/user.model');
const Event=require('../models/event.model');
const Entreprise=require('../models/entreprise.model');
const { F } = require('lodash/fp');
const Desicion=require('../models/desicion.model');


exports.statsController=async(req,res)=>{

    const users=await User.find();
    const entreprises=await Entreprise.find();
    const events=await Event.find();

res.status(200).send({user:users.length,entreprise:entreprises.length,event:events.length})
}

exports.chart=async(req,res)=>{
    let j=0;
    let f=0;
    let m=0;
    let a=0;
    let ma=0;
    let jo=0;
    let ju=0;
    let ou=0;
    let sep=0;
    let oc=0;
    let nov=0;
    let dec=0;


    const jan=await Event.find()

    jan.forEach(el=>{
 
        let dateS=new Date(el.start);
         let dateE=new Date(el.end);
        

        switch (dateS.getMonth()+1){
            case 1: j++ ; break;
            case 2: f++ ; break;
            case 3: m++ ; break;
            case 4: a++ ; break;
            case 5: ma++ ; break;
            case 6: jo++ ; break;
            case 7: ju++ ; break;
            case 8: ou++ ; break;
            case 9: sep++ ; break;
            case 10: oc++ ; break;
            case 11: nov++ ; break;
            case 12: dec++ ; break;
        }
        switch (dateE.getMonth()+1){
            case 1: j++ ; break;
            case 2: f++ ; break;
            case 3: m++ ; break;
            case 4: a++ ; break;
            case 5: ma++ ; break;
            case 6: jo++ ; break;
            case 7: ju++ ; break;
            case 8: ou++ ; break;
            case 9: sep++ ; break;
            case 10: oc++ ; break;
            case 11: nov++ ; break;
            case 12: dec++ ; break;
        }

    }) 
let arr=[];
 arr.push(j);
 arr.push(f);
 arr.push(m);
 arr.push(a);
 arr.push(ma);
 arr.push(jo);
 arr.push(ju);
 arr.push(ou);
 arr.push(sep);
 arr.push(oc);
 arr.push(nov);
 arr.push(dec);
 let chartP=[];


 
const pE=await Desicion.find({status:'Pas encore'})
const eC=await Desicion.find({status:'En cours'})
const termine=await Desicion.find({status:'Termine'})

chartP.push(pE?.length)
chartP.push(eC?.length)
chartP.push(termine?.length)

 res.status(200).send({data:arr,chartP:chartP})
     
}