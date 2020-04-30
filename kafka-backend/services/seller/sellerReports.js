"use strict";
const Order = require("../../models/orders");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const redisClient = require("../../utils/redisConfig");

let sellerReports = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    redisClient.get(msg.sellerId + "sellerReportss", async (err, bookmarks) => {
      if (bookmarks) {
        console.log("From redis CLient", bookmarks);
        response.result = JSON.parse(bookmarks);
        response.status = STATUS_CODE.SUCCESS;
        response.data = MESSAGES.SUCCESS;
        return callback(null, response);
      } else {
        console.log("From sql");
        pool.query(
          `select product_id,SUM(view_count) as view_count,price,SUM(quantity) as quantity,SUM(product_sales_um) as product_sales_um,product_name from product_analytics where seller_id=${msg.sellerId} GROUP BY product_id;`,
          async (err, sqlResult) => {
            console.log("From sql", sqlResult);
            if (sqlResult && sqlResult.length > 0) {
              response.result = sqlResult;
              redisClient.setex(
                msg.sellerId + "sellerReportss",
                36000,
                JSON.stringify(sqlResult)
              );
            }
            // console.log("Par Product", sqlResult);
            response.status = STATUS_CODE.SUCCESS;
            response.data = MESSAGES.SUCCESS;
            return callback(null, response);
          }
        );
      }
    });
  } catch (error) {
    console.log("Error occ while fetching order" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.sellerReports = sellerReports;
