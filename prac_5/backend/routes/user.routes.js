const userRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { dashboard, premium, admin } = require("../controllers/user.controllers")

userRouter.get("/dashboard",authorize("admin", "premium", "user") ,authMiddleware, dashboard);
userRouter.get("/premium",authorize("admin", "premium") ,authMiddleware, premium);
userRouter.get("/admin",authorize("admin") ,authMiddleware, admin);

module.exports = userRouter;