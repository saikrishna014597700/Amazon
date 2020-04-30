"use strict";
const Seller = require("../../models/seller");
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getSellerProfile = async (msg, callback) => {
  let response = {};
  let err = {};
  try {
    console.log("Seller is and body", +msg.sellerId, msg.body);
    Seller.findOne({ userId: +msg.sellerId })
      .then((res) => {
        response.result = res;
        response.status = STATUS_CODE.SUCCESS;
        response.data = MESSAGES.SUCCESS;
        console.log("Seller update response:::", response);
        return callback(null, response);
      })
      .catch((err) => {
        console.log("Error occ while updating seller", err);
      });
  } catch (error) {
    console.log("Error occ while updating seller" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getSellerProfile = getSellerProfile;
