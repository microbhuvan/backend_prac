const jwt = require("jsonwebtoken");
const jwt_secret = process.env.jwt_secret

const authMiddleware = async(req, res, next)=>{
    try{
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({ message: "token missing"});
        }

        const decoded = jwt.verify(accessToken, jwt_secret);

        req.user = decoded;
        return next();
    }
    catch(err){
        console.log(err.message);
        return res.status(401).json({ message: "invalid or expired token" });
    }
}

module.exports = authMiddleware;