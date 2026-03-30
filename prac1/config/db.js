const mongoose = require("mongoose");
const mongourl = process.env.mongourl;

const connectDB = async()=>{
    try{
        await mongoose.connect(mongourl);
        console.log("mongodb connected succcessfully")
    }
    catch(e){
        console.log(e);
    }
}

module.exports = connectDB;

