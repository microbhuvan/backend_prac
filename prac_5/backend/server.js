//backend/server.js
require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/", (req, res)=>{
    return res.status(200).json({message: "app working"});
})
app.use("/auth", authRouter);


connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("server started")
    })
})
.catch((err)=>{
    console.log("cannot restart server: ",err.message);
})