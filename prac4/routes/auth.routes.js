const authRouter = require("express").Router()
const { signUp,logIn } = require("../controllers/auth.controller")

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);

module.exports = authRouter;
