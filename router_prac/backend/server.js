require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);

app.get("/",(req, res)=>{
    return res.status(200).send("just testing the connection");
})

app.listen(PORT, async()=>{
    try{
        await mongoose.connect(MONGO_URL);
    }
    catch(err){
        console.log(err);
    }
    console.log("server started");
})