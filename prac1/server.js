require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const port = process.env.port || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req, res)=>{
    res.json("sending response from server");
});

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log("server started at port ");
    });
})
.catch((err)=>{
    console.log("error connecting",err.message);
})

