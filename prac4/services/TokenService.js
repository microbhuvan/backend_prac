const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_KEY;

function generateAccessToken(id){
    return jwt.sign(
        {id},
        jwtSecret,
        {expiresIn: "15m"}
    )
}

function generateRefreshToken(id){
    return jwt.sign(
        {id},
        jwtSecret,
        {expiresIn: "7d"}
    )
}

function generateTokens(id){
    const accessToken = generateAccessToken(id);
    const refreshToken = generateRefreshToken(id);
    return {accessToken, refreshToken}
}

function verifyToken(token){
    return jwt.verify(
        token,
        secret
    )
}

module.exports = { generateAccessToken, generateRefreshToken, generateTokens, verifyToken };