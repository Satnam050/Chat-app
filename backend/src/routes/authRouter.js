const {Router} = require("express");

const authRouter = Router();

const {newUserSignUp,userLogIn,userLogOut, updateProfile} = require("../controllers/authController");
const {protectRoute,checkAuth} = require("../middlewares/authMiddleware");

authRouter.post("/signup", newUserSignUp);


authRouter.post("/login", userLogIn);


authRouter.post("/logout",userLogOut);

authRouter.put("/update-profile",protectRoute, updateProfile);

authRouter.get("/check",protectRoute,checkAuth);

module.exports = authRouter;