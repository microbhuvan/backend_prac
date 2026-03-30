const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next)=>{
	
	const header = req.header.authorization;

	if(!header){
		return res.status(400).json({message:"auth error"});
	}

	const token = header.split(" ")[1];

	try{
		const decoded = await jwt.verify(token , process.env.jwt_secret);
		req.user = decoded;
		next();
	}
	catch(err){
		return res.status(401).json({message: "invalid token"});
	}

}

module.exports = authMiddleware;


