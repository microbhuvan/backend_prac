const { signUp, logIn, refresh, logout, getInfo } = require("../controllers/auth.controllers")
const authRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware")
const { loginLimiter } = require("../middlewares/ratelimiter");

authRouter.post("/signup", signUp);
authRouter.post("/login", loginLimiter, logIn);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);

authRouter.get("/me", authMiddleware, getInfo);


module.exports = authRouter;