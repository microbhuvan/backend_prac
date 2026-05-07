const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

async function signUp(req, res){
    try{
        const { username, email, password } = req.body;

        if(!email || !password){
            return res.status(401).json({message: "invalid credentials"})
        }

        const isPresent = await User.findOne({email});
        if(isPresent){
            return res.status(403).json({message: "user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const accessToken = await jwt.sign({id: user.id}, JWT_SECRET, {
            expiresIn: "15m"
        });

        const refreshToken = await jwt.sign({id: user.id}, JWT_SECRET, {
            expiresIn: "1d"
        });

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        .json({message: "user added successfully", user: {
            id: user.id,
            email: user.email,
            role: user.role
        }})
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message: "server error"})
    }
}


async function logIn(){
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(401).json({message: "invalid credentials"});
        }

        const isPresent = await User.findOne({email});
        if(isPresent){
            return res.status(403).json({message: "user already exists"});
        }
        
        
    
    
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message: "server error"});
    }
}

module.exports = { signUp, logIn };