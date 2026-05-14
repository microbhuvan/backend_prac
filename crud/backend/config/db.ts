import mongoose from "mongoose";

async function connectDB(){
    await mongoose.connect("http://localhost/3000/students");
}

export default connectDB;