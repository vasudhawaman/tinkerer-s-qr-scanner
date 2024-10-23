const {Schema, model}=require('mongoose');
const deviceSchema=new Schema({
    deviceId:{
        type:String,
        required:true,
        unique:true,
    },
    category:{
        type:String,
        required:true,
    },
    deviceImageURL:{
        type:String,
        required:true,
    },
    clubAuthorized:{
        type:String,
    },
},{timestamps:true});

const Device = model('device', deviceSchema);
module.exports=Device;