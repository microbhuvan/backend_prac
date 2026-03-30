//signUp.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { genTokens, genAccessToken, verifyToken } = require("../resources/TokenService");
const User = require("../models/User");
const jwtverify = require("../middleware/jwtverify");

const signUpRouter = express.Router();
const refreshRouter = express.Router();

signUpRouter.post("/signup", jwtverify, async(req, res)=>{
    const { name, email, password } = req.body;
    
    const isExist = await User.findOne({email});
    if(isExist){
        return res.status(400).json({message: "user already exist"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    });

    const {accessToken, refreshToken} = await genTokens(user._id);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000
    })
    .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .status(200).json({message: "user created and logged in"});


});


refreshToken.post("/refresh", async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;

    const { id } = verifyToken(refreshToken);

    const user = await User.findOne({id});

    if(!user){
        return res.status(404).json({message: "user not found"});
    }

    //how to check if refreshTOken is expired or not 

    const accessToken = genAccessToken(user._id);

    return res.status(400).cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000
    })
})

module.exports = signUpRouter;
module.exports = refreshRouter;













