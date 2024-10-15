const express=require('express');
const { checkForAuthenticationCookie } = require('./middlewares/auth');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
// make this an ASYNC function named dbConnect and not .then method
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("Server connected")});
const userRoute=require('./routes/user');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));  // WE are using header-token method bearer method and not cookies. Make  those changes
// app.use(isAdmin);
// app.use(isUser);

// No need for EJS. Use POSTMAN/thunderclient for testing 
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",(req,res)=>{
    return res.render("home",{
        user:req.user,
    });
});

app.use("/user",userRoute);

const port = process.env.PORT;
app.listen(port,()=>console.log("Server Started Successfully."));
