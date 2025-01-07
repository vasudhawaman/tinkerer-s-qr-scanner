const {Schema, model}=require('mongoose');
const deviceSchema=new Schema({
    deviceId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    lastUsed:{
        type:Date,
        required:false,
    }
},{timestamps:true});

const Usage= model("Usage", deviceSchema);

module.exports=Usage;