//server.js
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.get("/",()=>{
    console.log("testing route")
})


connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("server connected");
    })    
})
.catch((err)=>{
    console.log("error in starting the server ", err);
})

