const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.get("/",()=>{
    console.log("testing route")
})



app.listen(PORT, ()=>{
    console.log("server connected");
})
