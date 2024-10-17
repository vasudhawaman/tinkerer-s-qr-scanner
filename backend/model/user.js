const {Schema,model}=require('mongoose');
const { createTokenForUser } = require('../services/auth');
const bycrpt = require('bcrypt');

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{ // Hashed Password
        type:String,
        required:true,
    },
    club:{
        type:String,
        default:"Guest",
    },
    // isAdmin is either user or admin 
    isAdmin:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});

// matching password and generating token 
// Error handaling for incorrect password is missing
userSchema.static('matchPasswordAndGenerateToken',async function (email,password){
    const user=await this.findOne({email});
    console.log(user);
    if(!user) throw new Error("User Not Found!!");
    else if(!(await bycrpt.compare(password, user.password))) throw new Error("Password Incorrect!");
    const token=createTokenForUser(user); // add error handaling here as well in case no token is generated
    return token;
});

const User=model('user',userSchema);



module.exports=User;