const {Schema,model}=require('mongoose');
const { createTokenForUser } = require('../services/auth');

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true});

userSchema.static('matchPasswordAndGenerateToken',async function (email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error("User Not Found!!");
    const token=createTokenForUser(user); // add error handaling here as well in case no token is generated
    return token;
});

const User=model('user',userSchema);



module.exports=User;