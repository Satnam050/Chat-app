const messageModel = require("../models/messageModel");
const userModel = require("../models/userModel");
const cloudinary = require("../lib/cloudinary");

async function getUsersForSidebar(req,res){
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await userModel.find({_id : {$ne : loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        
        console.log("Error getting users", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}


async function getMessages(req,res) {
  try {
    const {id : userToChatId} = req.params;  
    const myId = req.user._id;
    const messages = await messageModel.find({
        $or :[
            {senderId : myId, receiverId : userToChatId},
            {senderId : userToChatId, receiverId : myId},
            
        ]
    })
    res.status(200).json({messages});
    
  } catch (error) {
    res.status(500).json({error : "Internal server error"});
  }
}


async function sendMessage(req,res) {
  try {
    const {text,image} = req.body;
    const {id : receiverId} = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      text,
      image : imageUrl,
    })
    await newMessage.save();

      // to-do : socket.io functionality
      res.status(201).json(newMessage);
  } catch (error) {
      console.log("Error in sendMessage controller", error.message);
      res.status(500).json({error :"Internal server error"});
  }
}
module.exports = {getUsersForSidebar,getMessages,sendMessage};