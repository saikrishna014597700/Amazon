"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let editProduct = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  var resultArray = [];
  try {
    console.log("Product Id is", msg);
    await Product.replaceOne({ _id: msg._id }, msg.productObj, function (
      err,
      replacedPro
    ) {
      Product.findById(msg._id, function (err, products) {
        resultArray[0] = products;
        response.result = resultArray;
        response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
        response.data = MESSAGES.CREATE_SUCCESSFUL;
        console.log("Error occ while savong product" + resultArray);
        return callback(null, response);
      });
    });
  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.editProduct = editProduct;
