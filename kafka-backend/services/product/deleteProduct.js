"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let deleteProduct = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  var resultArray = [];
  try {
    console.log("Product Id is", msg);
    await Product.update(
      { _id: msg._id },
      { $set: { isDeleted: 1 } },
      function (err, replacedPro) {
        response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
        response.data = MESSAGES.CREATE_SUCCESSFUL;
        console.log("Error occ while savong product" + resultArray);
        return callback(null, response);
      }
    );
  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.deleteProduct = deleteProduct;
