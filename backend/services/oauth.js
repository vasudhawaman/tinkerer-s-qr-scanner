const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user');
const jwt = require('jsonwebtoken')
const env = require("dotenv");
env.config();
const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
const JWT_SECRET ="Tinkerer_Lab@123" ;
const ALLOWED_DOMAIN = "iiti.ac.in";
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret:process.env.OAUTH_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  redirect_uri:process.env.FRONTEND,
  passReqToCallback: true
},
  async (request, accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const domain = email.split('@')[1]; 
    if (domain !== ALLOWED_DOMAIN) {
      return done(null, false, { message: `Unauthorized domain: ${domain}` });
    }
    

    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value
      });
      await user.save();
    }
    const data1 = {
      user: {
        id: user.id,
        email: user.email
      }
    }
    const authToken = jwt.sign(data1, JWT_SECRET);

    return done(null, { authToken, profile });
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
