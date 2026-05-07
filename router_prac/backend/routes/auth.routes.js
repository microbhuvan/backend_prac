const authRouter = require("express").Router();
const { signUp } = require("../controllers/auth.controllers")

authRouter.post("/signup", signUp);

module.exports = authRouter;