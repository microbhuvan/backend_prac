const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/signup", async(req, res)=>{
    const{name, emailId, password} = req.body;

    let user = await User.findOne({emailId});

    if(user){
        res.status(401).json({message:"user already exists"});
    }

    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
        name,
        emailId,
        password : hashedPassword
    })

    res.status(200).json({message : "successful"})

})

module.exports = router;