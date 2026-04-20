// backend/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { verifyToken, generateTokens } = require("../services/TokenService");
const bcrypt = require("bcryptjs");

const authMiddleware = async(req, res, next)=>{
    try{
        const accessToken = req.cookies.accessToken;
        console.log(accessToken)

    if(!accessToken){
        return res.status(401).json({message: "token not found"})
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    console.log("access token worked")
    return next();

    }
    catch(err){
        console.log(err);
        //return res.redirect("/login")
    }


    try{
        const incomingRefreshToken = req.cookies.refreshToken
        console.log(incomingRefreshToken)

        const decoded = verifyToken(incomingRefreshToken);

        const user = await User.findById(decoded.id);

        if(!user || !user.refreshToken){
            return res.redirect("/login");
        }

    const isMatched = await bcrypt.compare(incomingRefreshToken, user.refreshToken);

    if(!isMatched){
        return res.status(401).json({message: "invalid token"})
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();

    console.log("refreshWOkred")

    res.status(200)
    .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1* 60*1000
    })
    .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 *1000
    })

    return next();

    }
    
    catch(err){
        console.log(err)
        // return res.status(500).json({message:"server error"})
        res.redirect("/login")
    }

}

module.exports = authMiddleware;