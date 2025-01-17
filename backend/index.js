const express=require('express');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose=require('mongoose');
const session = require('express-session');
const cors=require('cors');
// make this an ASYNC function named dbConnect and not .then method
mongoose.connect("mongodb://localhost:27017/tLab").then(()=>{console.log("DB connected")});
require('./services/oauth');
const userRoute=require('./routes/user');
const deviceRoute = require('./routes/device');
const usageRoute = require('./routes/usage');
//Middlewares
app.use(flash());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
       secure:true,
       expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors('http://localhost:3000/'));

app.use("/user",userRoute);
app.use('/device',deviceRoute);
app.use("/usage",usageRoute);
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/error',failureMessage: true }),
  (req, res) => {
       const {authToken}=req.user;
       res.redirect(`http://localhost:3000/scan?token=${authToken}`);
  });
const port = 8000 ;
app.listen(port,()=>console.log("Server Started Successfully."));
