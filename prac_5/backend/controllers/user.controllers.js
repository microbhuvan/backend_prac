const User = require("../models/user");


const dashboard = async(req, res)=>{
    
    try{
        const decoded = req.user;
        console.log(decoded)
    if(!decoded){
        return res.status(401).json({message: "unauthorized"});
    }

    const user = await User.findById(decoded.id);

    if(!user){
        return res.status(404).json({message: "user doesnt exist"});
    }

    //console.log(user);

    return res.status(200).json({data: user.name});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message: "server error"})
    }
}

module.exports = { dashboard }