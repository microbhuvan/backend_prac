const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.json());

app.use(session({
    secret: "mysecret", //used to sign cookie
    resave: false, //dont save again if nothing is saved
    saveUninitialized: false, //dont create session until i store somethihng
    store:MongoStore.create({
        mongoUrl: "mongodb://127/0.0.1:27017/session_prac"
    }),
}));

app.post("/login", (req, res)=>{
    const {email} = req.body;

    req.session.user = {email};

    res.send("logged in");
})

app.get("/profile",(req, res)=>{
    if(!req.session.user){
        return res.send("not logged in");
    }

    res.send(`hello ${req.session.user.email}`);
});


app.post("/logout", (req, res)=>{
    req.session.destroy(()=>{
        res.send("logged out")
    })
})

app.listen(3000, ()=>{
    console.log("server running")
})