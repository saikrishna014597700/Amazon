"use strict";
const config = {
  secret: "cmpe273_kafka_passport_mongo",
  frontendURI: "http://localhost:3000",
  kafkaURI: "localhost:2181",
  mysqlUser: "amazonuser",
  mysqlPassword: "amazonuser",
  mysqlHost: "amazondb.cmod13ww0plr.us-east-1.rds.amazonaws.com",
  mysqlDatabase: "amazonDB",
  awsBucket: "amazon-cmpe273",
  // Keys can't be added here because AWS categorizes this as vulnerability.
  awsAccessKey: "AKIAIVVSEWVULCHONKKA",
  awsSecretAccessKey: "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",
  awsPermission: "public-read",
  redisHost: "54.173.125.207",
  redisPort: 6379,
  mongoDBURI:
    "mongodb+srv://amazonuser:amazonuser@amazoncluster-zqunn.mongodb.net/amazonDB?retryWrites=true&w=majority",
};

module.exports = config;
