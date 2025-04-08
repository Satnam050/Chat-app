const jwt = require("jsonwebtoken");


function generateToken(user,res){
    const payload = {
        _id : user._id,
        email : user.email,
    }
     const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "7d"});

     res.cookie("token" ,token,{
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
        sameSite : "strict",
        secure : process.env.NODE_ENV !== "development",
     })
     return token;
}

module.exports = {generateToken};