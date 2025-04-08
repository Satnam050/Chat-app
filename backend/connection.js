const mongoose = require("mongoose");

async function connectToMongoDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected succesfully");
    } catch (error) {
        console.log(error);
        
    }

}

module.exports = connectToMongoDB;