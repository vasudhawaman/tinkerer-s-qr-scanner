const jwt=require('jsonwebtoken');
const secret = "Tinkerer_Lab@123";

// add error handaling in case something goes wrong 
function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
    };
    const token=jwt.sign(payload,secret);
    console.log(token);
    return token;
}

function validateToken(token, secret, next) {
    try {
        const payload = jwt.verify(token, secret);
        console.log(payload);
        return payload;
    } catch (error) {
        console.error("Token validation error:", error.message);
        if (next) {
            next(error); // Passes the error to the next middleware
        } else {
            throw error; // Re-throws the error if next is not provided
        }
    }
}


module.exports={createTokenForUser,validateToken};