import  express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import commentRoute from './Routes/comment.js'
import videoRoute from "./Routes/video.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

mongoose.set('strictQuery',false);

const connect = async()=>{
    try{
     await mongoose.connect(process.env.MONGO)
    }catch(error){
      throw(error)
    }
}



mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected")
})

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user",userRoute);
app.use("/api/comment",commentRoute);
app.use("/api/video",videoRoute)

//error handlers 
app.use((err, req,res,next)=>{
  const status =err.status || 500;
  const message = err.message || "Someting is wrong";
  return res.status(status).json({
    success:false,
    status,
    message,
  })
})

app.listen(8800,()=>{
    connect();
    console.log("server started at port 8800")
})
