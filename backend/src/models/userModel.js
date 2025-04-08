const {Schema , model} = require("mongoose");
const { type } = require("os");

const userSchema = new Schema({
    fullName :{
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        minlength :6,
    },

    profilePic : {
        type : String,
        default: "",
    
    }

},{timestamps : true});


const userModel = model("User",userSchema);

module.exports = userModel;