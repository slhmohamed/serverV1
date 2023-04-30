const express=require('express')
const app=express();
const connection=require('./DB/db.js');
const userRoute=require('./routes/user.routes');
const authRouter=require('./routes/auth.route')
const entrepriseRoute=require('./routes/entreprise.route')
const eventRoute=require('./routes/event.route')
const desicionRoute=require('./routes/desicion.route.js');
const pvRoute=require('./routes/pv.route.js')
 
const cors=require('cors')
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(cors())

 connection();
app.use('/api/user',userRoute);
app.use('/api/auth',authRouter);
app.use('/api/entreprise',entrepriseRoute);
app.use('/api/event',eventRoute);
app.use('/api/desicion',desicionRoute);
app.use('/api/pv',pvRoute);
app.use('/upload',express.static(__dirname+'/upload'));
const { Server } = require("socket.io");

 const PORT=process.env.PORT||3000;
const server=app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);

    const io = new Server(server, {
        cors: {
          origin: "http://localhost:3000", 
           
        },
      });
      
      io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
      
        socket.on("join_room", (data) => {
          socket.join(data);
          
        });
      
        socket.on("send_message", (data) => {
          socket.to(data.room).emit("receive_message", data);
        });
      
        socket.on("disconnect", () => {
          
        });
      });
    })      