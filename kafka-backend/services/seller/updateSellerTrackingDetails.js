"use strict";
const Order = require("../../models/orders");
const moment = require("moment");
var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let updateSellerTrackingDetails = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  const data = {
    _id: new ObjectId(),
    trackingStatus: msg.trackingStatus,
    createDate: today.format(),
    // trackingAddress: {},
  };
  console.log("Data", data, msg);
  try {
    if (msg.trackingStatus == "Out for Shipping") {
      await Order.update(
        {
          _id: msg.orderId,
          products: { $elemMatch: { productId: msg.productId } },
        },
        {
          $addToSet: {
            "products.$.trackingInfo": data,
          },
          $set: {
            "products.$.status": "Shipped",
          },
        },
        async function (err, updated) {
          console.log("Result isss", updated);
          var isertQUERY = `update map_order_product set status = "Shipped" where order_Id =  "${msg.orderId}" and product_id = "${msg.productId}"`;
          await pool.query(isertQUERY, async (err, sqlResult) => {
            console.log("Got Result", sqlResult);
            if (sqlResult && sqlResult.affectedRows > 0) {
              response.result = await Order.findById({
                _id: msg.orderId,
                products: { productId: msg.productId },
              });
              console.log("Par Product", response.result);
              response.status = STATUS_CODE.SUCCESS;
              response.data = MESSAGES.SUCCESS;
              return callback(null, response);
              return callback(null, response);
            } else {
              response.status = STATUS_CODE.SUCCESS;
              response.data = MESSAGES.DATA_NOT_FOUND;
              return callback(null, response);
            }
          });
        }
      );
    } else {
      await Order.update(
        {
          _id: msg.orderId,
          products: { $elemMatch: { productId: msg.productId } },
        },
        {
          $addToSet: {
            "products.$.trackingInfo": data,
          },
        },
        async function (err, updated) {
          console.log("Result isss", updated);
          response.result = await Order.findById({
            _id: msg.orderId,
            products: { productId: msg.productId },
          });
          console.log("Par Product", response.result);
          response.status = STATUS_CODE.SUCCESS;
          response.data = MESSAGES.SUCCESS;
          return callback(null, response);
        }
      );
    }
  } catch (error) {
    console.log("Error occ while fetching order" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.updateSellerTrackingDetails = updateSellerTrackingDetails;
