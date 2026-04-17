const mongoose = require("mongoose");
const mongourl = process.env.mongoURL;

const connectDB = async()=>{
    await mongoose.connect(mongourl);
}

module.exports = connectDB;