const express=require('express');
const { checkForAuthenticationCookie } = require('./middlewares/auth');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
// make this an ASYNC function named dbConnect and not .then method
async function dbConnect(path) {
    await mongoose.connect(path);
    console.log("MongoDB connected.")
};

dbConnect("mongodb://127.0.0.1:27017/TL");

const userRoute=require('./routes/user');
const { db } = require('./model/user');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));  // WE are using header-token method bearer method and not cookies. Make  those changes
// app.use(isAdmin);
// app.use(isUser);

// No need for EJS. Use POSTMAN/thunderclient for testing 
app.get("/",(req,res)=>{
    return res.status(200).send("OK")
});

app.use("/user",userRoute);

//port make it a variable and NOT 3000 .Use port 8000
var port = 8000;
app.listen(port,()=>console.log("Server Started Successfully."));
