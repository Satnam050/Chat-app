const {Schema,model} = require("mongoose");

const messageSchema = new Schema({
    senderId :{
        type : Schema.Types.ObjectId,
        ref : "User",
        required :  true,
    },
    receiverId :{
        type : Schema.Types.ObjectId,
        ref : "User",
        required :  true,
    },
    text : {
        type : String,
    },
    image : {
        type : String,
    }

},{timestamps : true});

const messageModel = model("Message", messageSchema);

module.exports = messageModel;