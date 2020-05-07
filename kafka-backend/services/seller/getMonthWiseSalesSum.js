"use strict";
const Order = require("../../models/orders");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const redisClient = require("../../utils/redisConfig");

let getMonthWiseSalesSum = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  var fromDate = msg.year + "-" + msg.month + "-" + "01";
  var toDate = msg.year + "-" + msg.month + "-" + "30";
  try {
    var query = `SELECT SUM(product_sales_um) AS sales_sum FROM amazonDB.product_analytics WHERE seller_Id = ${msg.sellerId} and create_date BETWEEN "${fromDate}" AND "${toDate}"`;
    console.log("Query", query);
    pool.query(query, async (err, sqlResult) => {
      console.log("From sales sum", sqlResult.length, sqlResult[0].sales_sum);
      if (sqlResult && sqlResult.length > 0 && sqlResult[0].sales_sum) {
        response.result = sqlResult;
      } else {
        response.result = "No sales amount in given range";
      }
      // console.log("Par Product", sqlResult);
      response.status = STATUS_CODE.SUCCESS;
      response.data = MESSAGES.SUCCESS;
      return callback(null, response);
    });
  } catch (error) {
    console.log("Error occ while fetching order" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getMonthWiseSalesSum = getMonthWiseSalesSum;
