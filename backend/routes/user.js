const {Router}=require('express');
const router=Router();
const User=require('../model/user');
const Device=require('../model/device.js');
const Item=require('../model/item.js');
const connect=require('../connection/connection.js');
const {body, validationResult}=require('express-validator');

const port = 8000;
const mongo_url = "mongodb://127.0.0.1:27017/TL";

connect.dbConnect(mongo_url);

router.get("/dashboard",(req,res)=>{
    return res.send("AdminDashBoard");
});

router.get("/device/:id", async (req,res) => {
    const id = req.params.id;
    const device = await Device.findById(id);
    return res.status(200).json(device);
})

router.get("/allDevices", async (req,res) => {
    const devices = await Device.find({});
    return res.status(200).json(devices);
})

router.get("/:id", async (req,res) => {
    const user_id = req.params.id;
    const item = await Item.find({userId: user_id});
    return res.status(200).json(item);
})

router.post("/items", async (req, res) => {
    const { userId, deviceId } = req.body;
    try{
        const item = await Item.findOne({userId:userId, deviceId:deviceId})
        if(item) {
            await Item.findByIdAndUpdate(item._id, {numberOfUses: item.numberOfUses + 1, lastUsed: new Date().toLocaleString()});
        }
        else {
            await Item.create({
                userId: userId,
                deviceId: deviceId,
                lastUsed: new Date().toLocaleString(),
            });
        }
    }
    catch(error) {
        return res.status(400).json({errors: error.array()})
    }
})

router.post("/login", body('email').isEmail({host_whitelist: ["iiti.ac.in"]}), async (req, res) => {
    const { email, password } = req.body;
    const result = validationResult(req);
    if(result.isEmpty()) {
        try{
            const token = await User.matchPasswordAndGenerateToken(email, password);
            // return res.cookie("token",token).redirect("/");
            return res.status(200).json({"token":token});
        }
        catch(error){
            return res.status(400).json({"message":"Not found token!","error":error.array()});
        }
    }
    res.status(400).json(result);
});
module.exports=router;
