const mongoose = require("mongoose");
const mongoURL = process.env.mongoURL;

const connectDB = async()=>{
  try{
	await mongoose.connect(mongoURL);
	console.log("mongodb connected successfully");
  }
  catch(err){
	console.log("error",err);
  }
}

module.exports = connectDB;
