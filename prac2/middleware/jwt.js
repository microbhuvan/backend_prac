const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next)=>{

	const header = req.headers.authorization;

	if(!header){
		return res.status(401).json({message: "no token"});
	}

	const token = header.split(" ")[1];

	try{
		const decoded = await jwt.verify(token, process.env.jwt_secret);
		req.body = decoded;
		next();
	} 
	catch(err){
		return res.status(401).json({message: "invalid token"});
	}
}

module.exports = authMiddleware;
