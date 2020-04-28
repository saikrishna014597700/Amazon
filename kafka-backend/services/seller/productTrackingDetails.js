"use strict";
const Order = require("../../models/orders");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let productTrackingDetails = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    console.log("Order is", msg.orderId, msg.productId);
    response.result = await Order.findById({
      _id: msg.orderId,
      products: { productId: msg.productId },
    });
    console.log("Par Product", response.result);
    response.status = STATUS_CODE.SUCCESS;
    response.data = MESSAGES.SUCCESS;
    return callback(null, response);
    //   }
    // }
  } catch (error) {
    console.log("Error occ while fetching order" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.productTrackingDetails = productTrackingDetails;
