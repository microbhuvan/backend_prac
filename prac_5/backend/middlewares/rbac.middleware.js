//("premium", user).includes("user")

const authorize = (...allowedRoles) =>{
    return (req, res, next) =>{
        const userRole = req.user.role; //user

        if(!userRole){
            return res.status(403).json({message: "no role found"});
        }

        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({
                message: "forbidden or insufficient permission"
            })
        }

        next();
    }
}

module.exports = authorize; 