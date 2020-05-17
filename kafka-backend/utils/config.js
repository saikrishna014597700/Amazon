"use strict";
module.exports = {
  mongoDBURI: "Your Mongo URI",
  kafkaURI: "localhost:2181",
  mysqlUser: "Your mysqlUser",
  mysqlPassword: "Your mysqlPassword",
  mysqlHost: "Your mysqlHost",
  mysqlDatabase: "amazonDB",
  awsBucket: "Your awsBucket",
  // This is AWS Redis instance. Connect to this if you don't want to connect to local Redis
  // redisHost: "54.173.125.207",
  redisHost: "Redis host",
  redisPort: 6379,
  secret: "Your passport secret key",
  frontendURI: "http://localhost:3000",
  // Keys can't be added here because AWS categorizes this as vulnerability.
  awsAccessKey: "Your awsAccessKey",
  awsSecretAccessKey: "Your awsSecretAccessKey",
  awsPermission: "public-read",
};
