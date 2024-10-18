const {Schema, model}=require('mongoose');
const itemSchema=new Schema({
    userId:{
        type:Object,
        required: true,
    },
    deviceId:{
        type:String,
        required:true,
    },
    numberOfUses:{
        type:Number,
        default:0,
    },
    lastUsed:{
        type:String,
        required:true,
    },
}, {timestamps:true});

const Item = model(itemSchema);
module.exports=Item;