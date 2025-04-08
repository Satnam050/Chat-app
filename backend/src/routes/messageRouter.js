const {Router} = require("express");
const { protectRoute } = require("../middlewares/authMiddleware");
const { getUsersForSidebar,getMessages,sendMessage } = require("../controllers/messageController");

const messageRouter = Router();

messageRouter.get("/users",protectRoute, getUsersForSidebar);

messageRouter.get("/:id",protectRoute,getMessages);

messageRouter.post("/send/:id",protectRoute,sendMessage);
module.exports = messageRouter;