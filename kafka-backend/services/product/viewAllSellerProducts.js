"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let viewAllSellerProducts = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    console.log("Seller Id:::", msg.sellerId);
    var sellerProducts = await Product.find({
      sellerId: msg.sellerId,
      isDeleted: 0,
    });
    response.result = sellerProducts;
    response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);
    //   }
    // }
  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.viewAllSellerProducts = viewAllSellerProducts;
