const { createClient } = require("redis");

const client = createClient();

client.on("err", ()=>{
    console.log("redis cache error ",err);
})

async function connectRedis(){
    await client.connect();
}

module.exports = { client, connectRedis };