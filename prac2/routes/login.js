const express = require("express");
const mongoose = require("mongoose");
const loginRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

loginRouter.post("/login", async(req, res)=>{

    try{
            const { email, password } = req.body;

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({message: "invalid credentials"});
        
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched){
        return res.status(401).json({message: "invalid credentials"});
        
    }

    return res.status(201).json({message: "login successfully"})
    }
    catch(err){
        return res.status(500).json({message: "server error"})
    }

})

module.exports = loginRouter;