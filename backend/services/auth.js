const jwt=require('jsonwebtoken');
const secret = "Tinkerer_Lab@123";

// add error handaling in case something goes wrong 
function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        club:user.club,
    };
    const token=jwt.sign(payload,secret);
    console.log(token);
    return token;
}

function validateToken(token){
    const payload=jwt.verify(token,secret);
    console.log(payload);
    return payload;
}

module.exports={createTokenForUser,validateToken};