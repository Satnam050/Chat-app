const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const { generateToken } = require("../authentication/utils");
const { cloudinary } = require("../lib/cloudinary");


async function newUserSignUp(req,res){
    const {fullName,email,password} = req.body;
    try {
        //hash password
        if(password.length<6){
            return res.status(400).json({message : "Password must be of atleast 6 characters"});
        }
        const user =await userModel.findOne({email});
        if(user) return res.status(400).json({message : "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await userModel.create({
            fullName,
            email,
            password : hashedPassword,
        })
        if(newUser){
            //generate jwt token here
            generateToken(newUser,res); 
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                email : newUser.email,
                fullName : newUser.fullName,
                profilePic : newUser.profilePic,

            })
        }
        else{
            res.status(400).json({message : "Invalid user Data"});
        }
        
    } catch (error) {
        console.log("Error is signup controller",error.message);
        res.status(500).json({message : "Internal server Error"});
    }

}


async function userLogIn(req,res){
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        generateToken(user,res);
        res.status(200).json({
            _id : user._id,
                email : user.email,
                fullName : user.fullName,
                profilePic : user.profilePic,
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        
    }

    
}


function userLogOut(req,res){
    try {
        res.clearCookie("token");
        res.status(200).json({message: "Logged out Successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

async function updateProfile(req,res){
        try {
            const {profilePic} = req.body;
            const userId = req.user._id;

            if(!profilePic){
                return res.status(400).json({message:"Profile pic is required"});
            }
            const uploadResponse = await cloudinary.uploader.upload(profilePic);

            const updatedUser = userModel.findByIdAndUpdate(userId,{
                profilePic : uploadResponse.secure_url
            },{new : true})

            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
}

module.exports = {newUserSignUp,userLogIn,userLogOut,updateProfile};