const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8080;

const authRouter = require("./routes/authRouter");
const messageRouter = require("./routes/messageRouter");


const connectToMongoDB = require("../connection");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);


app.listen(PORT,()=>{
    connectToMongoDB();
    console.log("Server started at port 8080");
})