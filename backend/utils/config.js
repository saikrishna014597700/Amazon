"use strict";
const config = {
  secret: "Your passport secret key",
  frontendURI: "http://localhost:3000",
  kafkaURI: "localhost:2181",
  mysqlUser: "Your mysqlUser",
  mysqlPassword: "Your mysqlPassword",
  mysqlHost: "Your mysqlHost",
  mysqlDatabase: "amazonDB",
  awsBucket: "Your awsBucket",
  // Keys can't be added here because AWS categorizes this as vulnerability.
  awsAccessKey: "Your awsAccessKey",
  awsSecretAccessKey: "Your awsSecretAccessKey",
  awsPermission: "public-read",
  redisHost: "Redis host",
  redisPort: 6379,
  mongoDBURI: "Your Mongo URI",
};

module.exports = config;
