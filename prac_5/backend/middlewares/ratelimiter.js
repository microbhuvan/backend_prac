const redis = require("../utils/redis.js");

const LIMITS = {
  login: { maxUser: 5, maxIP: 20, window: 60 },
  profile: { maxUser: 20, maxIP: 50, window: 60 }
};

const rateLimiter = (type) => {
  return async (req, res, next) => {
    try {
      let identifier;

      if (type === "login") {
        identifier = req.body.email;
      } else {
        identifier = req.user?.id;
      }

      if (!identifier) return next();

      const ip = req.ip;
      const { maxUser, maxIP, window } = LIMITS[type];

      const userKey = `${type}:user:${identifier}`;
      const ipKey = `${type}:ip:${ip}`;

      const userAttempts = await redis.incr(userKey);
      const ipAttempts = await redis.incr(ipKey);

      
      if (userAttempts === 1) await redis.expire(userKey, window);
      if (ipAttempts === 1) await redis.expire(ipKey, window);

      
      if (userAttempts > maxUser || ipAttempts > maxIP) {
        const userTTL = await redis.ttl(userKey);
        const ipTTL = await redis.ttl(ipKey);

        let retryAfter = Math.max(userTTL, ipTTL);

        if (retryAfter < 0) retryAfter = window;

        return res
          .status(429)
          .set("Retry-After", retryAfter.toString()) 
          .json({
            message: "Too many requests",
            retryAfter 
          });
      }

      next();
    } catch (err) {
      console.log("Rate limiter error:", err);
      next();
    }
  };
};

module.exports = rateLimiter;