const {Schema, model}=require('mongoose');
const deviceSchema=new Schema({
    deviceId:{
        type:String,
        required:true,
        unique:true,
    },
    deviceImageURL:{
        type:String,
        required:false,
    },
    inUse: {
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    lastUsed:{
        type:String,
        required:false,
    }
},{timestamps:true});

const Device = model("Device", deviceSchema);

module.exports=Device;