"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const redisClient = require("../../utils/redisConfig");

let productSearchBDSK = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    redisClient.get("productSearchBDSK", async (err, products) => {
      if (err) {
        console.log("Redis Error", err);
      }
      if (products) {
        console.log("Getting results from redis kafka");
        response.result = products;
        response.status = STATUS_CODE.SUCCESS;
        response.data = MESSAGES.CREATE_SUCCESSFUL;
        return callback(null, response);
      } else {
        console.log("Not Getting results from redis kafka");
        var products = await Product.find({
          productName: { $regex: msg.searchValue, $options: "i" },
        });
        redisClient.setex("productSearchBDSK", 36000, JSON.stringify(products));
        response.result = products;
        response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
        response.data = MESSAGES.CREATE_SUCCESSFUL;
        return callback(null, response);
      }
    });
  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.productSearchBDSK = productSearchBDSK;
