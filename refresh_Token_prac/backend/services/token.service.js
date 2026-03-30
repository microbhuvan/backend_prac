//resources folder
//TokenService.js
const jwt = require("jsonwebtoken");
const secret = process.env.JWTsecretKey;

    async function genTokens(id){
        const accessToken = await genAccessToken(id);
        const refreshToken = await genRefreshToken(id);

        return {accessToken, refreshToken};
    }

    function genAccessToken(id){
        return jwt.sign(
            {id},
            secret,
            {expiresIn: "15m"}
        );
    }

    function genRefreshToken(id){
        return jwt.sign(
            {id},
            secret,
            {expiresIn: "7d"}
        );
    }

    function verifyToken(token){
        return jwt.verify(
            token,
            secret
        );
    }

module.exports =  { genTokens, genAccessToken, genRefreshToken, verifyToken };


