const express=require('express')
const app=express();
const connection=require('./DB/db.js');
const userRoute=require('./routes/user.routes');
const authRouter=require('./routes/auth.route')
const entrepriseRoute=require('./routes/entreprise.route')
const eventRoute=require('./routes/event.route')
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
 const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);

})
