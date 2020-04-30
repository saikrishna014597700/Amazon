const redis = require("redis");
const { redisPort, redisHost } = require("../utils/config");

// const redisClient = redis.createClient(redisPort, redisHost);
const redisClient = redis.createClient();

redisClient.on("connect", (err) => {
  if (err) {
    console.log("Error while connecting to Redis server");
  } else {
    console.log("Redis Server Connected");
  }
});

module.exports = redisClient;
