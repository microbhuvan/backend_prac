const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken")

async function authMiddleware(req, res, next){
    try{

        const { accessToken }  = req.cookies;

        if(!accessToken){
            return res.status(401).json({message: "invalid token"});
        }

        const decoded = await jwt.verify(accessToken, JWT_SECRET);
        req.user = decoded

        return next();
    }
    catch(err){
        console.log(err.message);
        return res.status(401).json({message: "invalid or expired token"});
    }

}

module.exports = authMiddleware;