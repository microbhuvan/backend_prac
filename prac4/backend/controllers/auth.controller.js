// backend/controllers/auth.controller.js

const User = require("../models/user.js")
const bcrypt = require("bcryptjs");
const {generateTokens} = require("../services/TokenService.js")

const signUp = async(req, res)=>{
    console.log("working in signup")
    try{
        const { username, email, password } = req.body;

    const isExist = await User.findOne({email})

    if(isExist){
        return res.status(403).json({message: "user already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();

    return res
    .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        //sameSite: "Strict",
        maxAge: 1 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        //sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .redirect("/dashboard");


    }
    catch(err){
        console.log(err);
        //return res.status(500).json({message: "server error"})
        res.redirect("/signup")
    }

    
}


const logIn = async(req, res)=>{
    try{
        console.log("inside login")
        const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message: "user doesnt exist"});
    }

    const isMatched = bcrypt.compare(password, user.password);

    if(!isMatched){
        return res.status(403).json({message: "invalid credentials"});
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();

    console.log(user);
    console.log(accessToken)
    console.log(refreshToken)
    
    return res.status(200)
    .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 15 * 60 * 1000 
    })
    .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .redirect("/dashboard");

    }
    catch(err){
        console.log(err);
        //return res.status(500).json({message: "server error"});
        res.redirect("/login");
    }

}

const refresh = async(req, res)=>{
    
    
}

module.exports = { signUp, logIn, refresh }