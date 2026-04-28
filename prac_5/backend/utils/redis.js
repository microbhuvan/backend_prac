const { createClient } = require("redis");

const redis = createClient({
  url: "redis://127.0.0.1:6379"
});

redis.on("error", (err) => {
  console.log("Redis error:", err);
});

async function connectRedis() {
  await redis.connect();
  console.log("Redis connected");
}

connectRedis();

module.exports = redis;