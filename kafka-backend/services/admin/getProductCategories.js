"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const redisClient = require("../../utils/redisConfig");

let getProductCategories = async (msg, callback) => {
  let response = {};
  let err = {};
  // const today = moment();
  try {
    redisClient.get("categories", async (err, categories) => {
      if (err) {
        console.log("Redis Error", err);
      }
      if (categories) {
        console.log("categories from redis");
        console.log("Getting results from redis kafka");
        response.result = JSON.parse(categories);
        response.status = STATUS_CODE.SUCCESS;
        response.data = MESSAGES.CREATE_SUCCESSFUL;
        return callback(null, response);
      } else {
        console.log("No categories in redis");
        pool.query(
          `select * from product_categories`,
          async (err, sqlResult) => {
            if (sqlResult && sqlResult.length > 0) {
              response.result = sqlResult;
              redisClient.setex("categories", 36000, JSON.stringify(sqlResult));
            }
            response.status = STATUS_CODE.SUCCESS;
            response.data = MESSAGES.SUCCESS;
            return callback(null, response);
          }
        );
      }
    });
  } catch (error) {
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getProductCategories = getProductCategories;
