//backend/config/db.js
const mongoose = require("mongoose");
const mongoURL = process.env.mongoURL;

const connectDB = async()=>{
    await mongoose.connect(mongoURL);
}

module.exports = connectDB;