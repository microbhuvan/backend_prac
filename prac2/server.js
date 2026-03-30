require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.port || 3000;
const connectDB = require("./config/db.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",()=>{
	console.log("getting data");
});

connectDB().
then(()=>{
app.listen(PORT, ()=>{
	console.log("server started");
    })
})
.catch((err)=>{
	console.log("error",err);
});
