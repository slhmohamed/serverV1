const express=require('express')
const app=express();
const connection=require('./DB/db.js');
const userRoute=require('./routes/user.routes');
const authRouter=require('./routes/auth.route')
const entrepriseRoute=require('./routes/entreprise.route')
const eventRoute=require('./routes/event.route')
const desicionRoute=require('./routes/desicion.route.js');
const pvRoute=require('./routes/pv.route.js');
const statRoute=require('./routes/stats.route.js');
const messageRoutes = require("./routes/message.route.js");

 
const cors=require('cors')
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(cors())

 connection();
app.use('/api/user',userRoute);
app.use("/api/messages", messageRoutes);

app.use('/api/auth',authRouter);
app.use('/api/entreprise',entrepriseRoute);
app.use('/api/event',eventRoute);
app.use('/api/desicion',desicionRoute);
app.use('/api/pv',pvRoute);
app.use('/api/stat',statRoute);
app.use('/upload',express.static(__dirname+'/upload'));
 
const socket = require("socket.io");

 const PORT=process.env.PORT||3000;
const server=app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);

   
   
    })      
    
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});