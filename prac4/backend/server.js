//backend/server.js

require("dotenv").config();
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/auth.middleware");

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}))
app.use(cookieParser());

app.use("/auth",authRouter);



app.get("/", (req, res)=>{
    console.log("working")
    return res.render("signUp.ejs")
})

app.get("/login",(req, res)=>{
    return res.render("login.ejs")
})

app.get("/dashboard", authMiddleware, (req, res)=>{
    return res.render("dashboard.ejs")
})

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server started");
    })
})
.catch((err)=>{
    console.log("error in connecting db ",err.message);
})