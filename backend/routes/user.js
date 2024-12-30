const {Router}=require('express');
const router=Router();
const User=require("../model/user");

router.get("/dashboard",(req,res)=>{
    return res.send("AdminDashBoard");
});

// make all API routes using status codes and json response not rendering EJS.
// USE postman/ thunder client for testing the API 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.status(200).json({ "token": token });
    } catch (error) {
        return res.status(400).json({ 
            "message": error.message || "An error occurred during login", 
            "error": error.stack || error 
        });
    }
});

module.exports=router;