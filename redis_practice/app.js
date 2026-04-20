const express = require("express");
const app = express();
const { client, connectRedis } = require("./redis");

app.use(express.json());

connectRedis();

app.post("/set", async(req, res)=>{

    const { key, value } = req.body;

    await client.set(key, JSON.stringify(value));

    return res.json({message: "data stored in redis"});
})

app.get("/get/:key", async(req, res)=>{

    const { key } = req.params;
    const data = await client.get(key);

    if(!data){
        return res.json({message: "user not available"});
    }

    return res.json({data: JSON.parse(data)});
})