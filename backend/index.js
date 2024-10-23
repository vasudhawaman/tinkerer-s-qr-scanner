const express=require('express');
const { checkForAuthenticationCookie }=require('./middlewares/auth');
const app=express();
const cookieParser=require('cookie-parser');
const userRoute=require('./routes/user');
const { dbConnect }=require('./connection/connection')

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));  // WE are using header-token method bearer method and not cookies. Make  those changes

app.get("/",(req,res)=>{
    return res.status(200).send("OK")
});

app.use("/user",userRoute);

const port = 8000;
app.listen(port,()=>console.log("Server Started Successfully."));
