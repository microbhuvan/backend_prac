const bcrypt = require("bcryptjs")
const express = require("express")
const signUpRouter = express.Router();
const User = require("../models/user");

signUpRouter.post("/signup",async(req, res)=>{

    try{
        const {username, email, password} = req.body;

    const existingEmail = await User.findOne({email});

    if(existingEmail){
        return res.status(400).json({message: "user already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    return res.status(201).json({message: "user created successfully"})
    }
    catch(err){
        return res.status(500).json({message: "server error"})
    }

    
})

module.exports = signUpRouter;
