"use strict";
const Seller = require("../../models/seller");
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const pool = require("../../utils/mysqlConnection");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const redisClient = require("../../utils/redisConfig");

let updateProfile = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  msg.body.updateDate = today.format();
  try {
    console.log("Seller is and body", +msg.sellerId, msg.body);
    pool.query(
      "UPDATE `users` set `name`=? WHERE `id` = ? ",
      [msg.body.sellerName, msg.sellerId],
      async function (error, result) {
        console.log(result);
      }
    );
    Seller.findOne({ userId: +msg.sellerId })
      .then((seller) => {
        seller.set(msg.body);
        return seller.save();
      })
      .then((res) => {
        redisClient.del("sellerProfile " + msg.sellerId, function (
          err,
          response
        ) {
          if (response == 1) {
            console.log("Deleted sellerProfile from Successfully!");
          } else {
            console.log("Cannot delete");
          }
        });
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

exports.updateProfile = updateProfile;
