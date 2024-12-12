const express = require("express");
const app=express();
const mongoose = require('mongoose')
const userRoute=require('./routes/user.route')
const blogRoute=require('./routes/blog.route')
const dotenv = require('dotenv')
dotenv.config();
const cors =require('cors') 
const cookieParser=require('cookie-parser')
const expressfileupload = require('express-fileupload');
const { v2: cloudinary } = require("cloudinary");


//* Middlewares
app.use(expressfileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));
app.use(cookieParser());

app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//*-------------=============----------------======---------
const PORT=process.env.PORT || 4000;
const MongoDB_URI=process.env.MongoDB_URI
// const MongoDB_URI_blogs = process.env.MongoDB_URI_blogs

//*Cloudinary setup=================================
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret:process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});

//*======================================================
app.use('/user',userRoute);
app.use('/blog',blogRoute);
//* MONGODB connect----------------------------------------------//
try {
    mongoose.connect(MongoDB_URI)
    console.log("connected to m db")
} catch (error) {
    console.log("Error: ",error)
}
//*==============================================================//
app.listen(PORT,()=>{
    console.log("server started");
})