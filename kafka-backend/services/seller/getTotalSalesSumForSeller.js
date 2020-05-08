"use strict";
const Order = require("../../models/orders");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const redisClient = require("../../utils/redisConfig");

let getTotalSalesSumForSeller = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  var query = `select SUM(product_sales_um) AS sales_sum from product_analytics p
  join map_order_product m
 ON p.order_id=m.order_Id and
 p.product_Id=m.product_Id and m.status!="Cancelled" and p.seller_Id=${msg.sellerId}`;
  try {
    pool.query(
      // `SELECT SUM(product_sales_um) AS sales_sum FROM amazonDB.product_analytics WHERE seller_Id = ${msg.sellerId}`,
      query,
      async (err, sqlResult) => {
        console.log("From sales sum", sqlResult);
        if (sqlResult && sqlResult.length > 0) {
          response.result = sqlResult;
        }
        // console.log("Par Product", sqlResult);
        response.status = STATUS_CODE.SUCCESS;
        response.data = MESSAGES.SUCCESS;
        return callback(null, response);
      }
    );
  } catch (error) {
    console.log("Error occ while fetching order" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getTotalSalesSumForSeller = getTotalSalesSumForSeller;
