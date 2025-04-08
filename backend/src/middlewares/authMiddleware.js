const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function protectRoute(req,res,next) {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Unauthorized user - No token provided"})
        }

        const payload = jwt.verify(token,process.env.JWT_SECRET);
        if(!payload){
            return res.status(401).json({message: "Unauthorized user - Invalid Token"})
        }
        const user = await userModel.findById(payload._id).select("-password");
        if(!user){
            return res.status(404).json({message: "User Not Found"})
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({message: "Internal server Error"});
        
    }
}

function checkAuth(req,res){
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports = {protectRoute,checkAuth};