const express = require("express");
const jwt = require("jsonwebtoken");

async function jwtverify(req, res, next){
    try{
        const token = req.cookies.accessToken;

    if(!token){
        return res.status(401).json({message: "unauthorized"});
    }

    const decoded = await jwt.sign(token, process.env.JWTsecretKey);

    req.user = decoded;

    next();
    }
    catch(err){
        return res.status(401).json({message: "token invalid"})
    }
}

module.exports = jwtverify;