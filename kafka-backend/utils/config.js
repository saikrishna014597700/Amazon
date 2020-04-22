"use strict";
module.exports = {
  mongoDBURI:
    "mongodb+srv://amazonuser:amazonuser@amazoncluster-zqunn.mongodb.net/amazonDB?retryWrites=true&w=majority",
  kafkaURI: "localhost:2181",
  // This is AWS Redis instance. Connect to this if you don't want to connect to local Redis
  redisHost: "54.173.125.207",
  // redisHost: "localhost",
  redisPort: 6379,
  secret: "cmpe273_kafka_passport_mongo",
  frontendURI: "http://localhost:3000",
  mysqlUser: "amazonuser",
  mysqlPassword: "amazonuser",
  mysqlHost: "amazondb.cmod13ww0plr.us-east-1.rds.amazonaws.com",
  mysqlDatabase: "amazonDB",
  awsBucket: "cmpe273twitter",
  // Keys can't be added here because AWS categorizes this as vulnerability.
  awsAccessKey: "",
  awsSecretAccessKey: "",
  awsPermission: "public-read",
};
