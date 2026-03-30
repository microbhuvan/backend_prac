//routes folder
//signUp.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { genTokens, genAccessToken, verifyToken } = require("../services/token.service");
const User = require("../models/User");


const signUp =  async(req, res)=>{
    try{
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
    user.refreshToken = refreshToken;
    await user.save();

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

    }
    catch(err){
        return res.status(500).json({message: "server error"})
    }

};

const refresh = async(req, res)=>{
    try{
        const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({message: "refreshToken not found"})
    }

    const { id } = verifyToken(refreshToken);

    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({message: "user not found"});
    }

    if(user.refreshToken !== refreshToken){
        return res.status(403).json({message: "invalid token"})
    }

    const accessToken = genAccessToken(user._id);

    return res.status(200).cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000
    }).json({message: "token refreshed"})
    }
    catch(err){
        return res.status(500).json({message: "server error"})
    }
};

const logout = async(req, res)=>{
    try{
        const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(204).end();
    }

    const { id } = verifyToken(refreshToken);
    const user = await User.findOne({_id: id});

    if(user){
        user.refreshToken = null;
        await user.save();
    }

    res.clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json({ message: "logged out" })
    }
    catch(err){
        return res.status(500).json({message: "server error"});
    }
};


module.exports = { signUp, refresh, logout };













