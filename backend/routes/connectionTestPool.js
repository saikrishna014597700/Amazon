"use strict";
const mongoose = require("mongoose");
const { mongoDBURI } = require("../utils/config");

//Mongo Connection
const connectMongoDB = async () => {
  const options = {
    poolSize: 900,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  try {
    console.log("MongoUrl", mongoDBURI);
    await mongoose.connect(mongoDBURI, options);
    console.log("MongoDB Pool connected");
  } catch (err) {
    console.log("Could not connect to MongoDB", err);
  }
};

module.exports = connectMongoDB;
