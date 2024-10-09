const express=require('express');
const { checkForAuthenticationCookie } = require('./middlewares/auth');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/tLab").then(()=>{console.log("Server connected")});
const userRoute=require('./routes/user');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
// app.use(isAdmin);
// app.use(isUser);

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",(req,res)=>{
    return res.render("home",{
        user:req.user,
    });
});

app.use("/user",userRoute);

app.listen("3000",()=>console.log("Server Started Successfully."));
