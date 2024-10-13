const {Router}=require('express');
const router=Router();
const User=require("../model/user");
const {body, validationResult} = require('express-validator');

router.get("/dashboard",(req,res)=>{
    return res.send("AdminDashBoard");
});

// make all API routes using status codes and json response not rendering EJS.
// USE postman/ thunder client for testing the API 
router.post("/login", body('email').customSanitizer(value => {
    let string = value.split("@");
    return string[1];
    }).equals('iiti.ac.in'), async (req, res) => {
    const { email, password } = req.body;
    const result = validationResult(req);
    if(result.isEmpty()) {
        try{
            const token = await User.matchPasswordAndGenerateToken(email, password);
            // return res.cookie("token",token).redirect("/");
            return res.status(200).json({"token":token});
        }
        catch(error){
            
            return res.status(400).json({"message":"Not found token!","error":error});
        }
    }
    res.status(400).json({
        msg: "Enter correct email!",
        errors: result.array()
    });
});
module.exports=router;