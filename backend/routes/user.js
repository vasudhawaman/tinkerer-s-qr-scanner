const {Router}=require('express');
const router=Router();
const User=require("../model/user");

router.get("/dashboard",(req,res)=>{
    return res.send("AdminDashBoard");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token",token).redirect("/");
    }
    catch(error){
        return res.render("home",{
            error:"Incorrect E-mail or Password",
        });
    }
});
module.exports=router;