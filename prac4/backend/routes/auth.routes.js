//backend/routes/auth.routes.js

const authRouter = require("express").Router()
const { signUp, logIn, refresh } = require("../controllers/auth.controller")

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
//authRouter.post("/refresh", refresh);

module.exports = authRouter;
