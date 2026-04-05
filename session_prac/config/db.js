const mongoose = require("mongoose");

let connection;

const connectDB = async()=>{
    connection = await mongoose.connect("mongodb://127.0.0.1:27017/session_prac");
    console.log("mongodb connected");
}

const getConnection = () => {return connection};

module.exports = { connectDB, getConnection };