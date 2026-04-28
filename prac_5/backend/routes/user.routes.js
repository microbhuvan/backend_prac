const userRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { dashboard } = require("../controllers/user.controllers")

userRouter.get("/dashboard", authMiddleware, dashboard);