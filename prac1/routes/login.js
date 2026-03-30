const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../config/db");
const jwt = require("jsonwebtoken");

const loginRouter = express.Router();

loginRouter.post("/signup", async(req, res)=>{
    const {name, emailId, password} = req.body;

    let user = await User.findOne({emailId});

    if(!user){
        res.status(400).json({message : "user not exist"});
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched){
        res.status(400).json({message: "invalid credentials"});
    }

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    )

    res.json({token})
})