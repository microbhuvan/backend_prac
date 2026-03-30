const authRouter = require("express").Router();

const { signUp, refresh, logout } = require("../controllers/auth.controller");

authRouter.post("/signUp", signUp);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);

module.exports = authRouter;