const express = require("express");
const pool = require("./db.js");
const app = express();

app.get("/",(req, res)=>{
    res.send("server is working");
})

app.get("/time", async(req, res)=>{
    const result = await pool.query("SELECT NOW()");
    console.log(result);
    res.json(result.rows);
})


async function initDB(){
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100))
        `)
    console.log("users table ready");
}
initDB();

app.listen(3000, ()=>{
    console.log("server started");
})