//backend/controllers/auth.controllers.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.jwt_secret;
const User = require("../models/user");

const signUp = async(req, res)=>{

    try{
        const { name, email, password } = req.body;
        if(!email || !password){
            return res.status(401).json({ message: "invalid credentials"})
        }

        const isPresent = await User.findOne({ email });
        if(isPresent){
            return res.status(403).json({ message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, 
            email,
            password: hashedPassword
        });
        
        const accessToken = jwt.sign({ id: user.id }, jwt_secret, {
            expiresIn: "1m"
        });

        const refreshToken = jwt.sign({ id: user.id }, jwt_secret, {
            expiresIn: "1d"
        });

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 1 * 60 * 1000
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        .json({ message: "user added successfully"});

    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({ message: "server error" })
    }
}


const logIn = async(req, res)=>{

    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(401).json({ message: "invalid credentials"})
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "user not found" });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){ 
            return res.status(401).json({ message: "invalid credentials" })
        }

        const accessToken = jwt.sign({id: user.id}, jwt_secret, {
            expiresIn: "1m"
        });

        const refreshToken = jwt.sign({id: user.id}, jwt_secret, {
            expiresIn: "1d"
        })

        return res.status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            //sameSite: "Strict",
            maxAge: 1 * 60 * 1000
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            //sameSite: "Strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        .json({message: "user logged in successfully"});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message: "server error"});
    }
    
}


const refresh = async(req, res)=>{
    try{
        console.log("entered refresh")
        const incomingRefreshToken = req.cookies.refreshToken;
        if(!incomingRefreshToken){
            return res.status(400).json({ message: "token not found" });
        }

        const { id } = req.decoded;
        const user = await User.findById(id);

        const isMatched = bcrypt.compare(incomingRefreshToken, user.refreshToken);
        if(!isMatched){
            return res.status(400).json({ message: "invalid token" });
        }

        const accessToken = jwt.sign({ id: user.id }, jwt_secret,{
            expiresIn: "1m"
        });
        const refreshToken = jwt.sign({ id: user.id }, jwt_secret, {
            expiresIn: "1d"
        });

        user.refreshToken = bcrypt.hash(refreshToken, 10);
        await user.save();

        return res.status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            //sameSite: "Strict",
            maxAge: 1 * 60 * 1000
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            //sameSite: "Strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        .json({message: "refreshed successfully"});

    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({ message: "server error" });
    }

}

const dashboard = async(req, res)=>{
    
    try{
        const decoded = req.user;
    if(!decoded){
        return res.status(401).json({message: "unauthorized"});
    }

    const user = await User.findById(user.id);

    if(!user){
        return res.status(404).json({message: "user doesnt exist"});
    }

    console.log(user);

    return res.status(200).json({data: user.name});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message: "server error"})
    }
}

module.exports = { signUp, logIn, refresh, dashboard };