const {Schema,model}=require('mongoose');
const { createTokenForUser } = require('../services/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema=new Schema({
    name:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:false,
    },
},{timestamps:true});

// matching password and generating token 
// Error handaling for incorrect password is missing 
userSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    try {
        const user = await this.findOne({ email });
        if (!user) {
            throw new Error("User Not Found!!");
        }
        const isMatch = password === user.password;
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        const token = createTokenForUser(user);
        if (!token) {
            throw new Error("Token generation failed");
        }
        return token;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || "An error occurred during login");
    }
});

const User=model('user',userSchema);



module.exports=User;