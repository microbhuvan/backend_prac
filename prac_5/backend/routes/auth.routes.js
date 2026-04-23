const { signUp, logIn, refresh, dashboard, logout, getInfo } = require("../controllers/auth.controllers")
const authRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware")

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);

authRouter.get("/me", authMiddleware, getInfo);
authRouter.get("/dashboard", authMiddleware, dashboard);

module.exports = authRouter;