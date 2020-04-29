"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getProductDetails = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    console.log("product Id:::", msg.productId);
    let productId = mongoose.Types.ObjectId(msg.productId);
    var products = await Product.find({
      _id: productId 
    });
    console.log("search results:::", products);
    response.result = products;
    response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    response.data = MESSAGES.SUCCESS;
    return callback(null, response);
  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getProductDetails = getProductDetails;
