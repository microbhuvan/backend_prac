const express = require("express");
const session = require("express-session");
const { getConnection, connectDB } = require("./config/db");
const session_secret = process.env.session_secret;
const PORT = 3000 || process.env.PORT;

const app = express();


app.use(express.json());

app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,

    store: getConnection(),

    cookie: {
        httpOnly: true,
        sameSite: "lax"
    }
}))

connectDB().
then(()=>{
        app.listen(PORT, ()=>{
        console.log("sever started")
    })
})
.catch((err)=>{
    console.error("db connection error ",err);
})
