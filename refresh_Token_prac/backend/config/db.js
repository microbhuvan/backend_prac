const mongoose = require("mongoose");
const mongoURL = process.env.mongoURL;

const connectDB = async()=>{
    try{
        await mongoose.connect(mongoURL);
    }
    catch(err){
        return res.status(500).json({message: "server error"})  
    }
}

module.exports = connectDB;