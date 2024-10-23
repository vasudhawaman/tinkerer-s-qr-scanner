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
        default:1,
    },
    lastUsed:{
        type:String,
        required:true,
    },
}, {timestamps:true});

const Item = model('item', itemSchema);
module.exports=Item;