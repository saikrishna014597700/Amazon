"use strict";
// const moment = require("moment");
// var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let addCategory = async (msg, callback) => {
  let response = {};
  let err = {};
  // const today = moment();
  try {
    pool.query(
      `INSERT INTO product_categories (category) VALUES ('${msg.categoryName}');`,
      async (err, sqlResult) => {
        console.log("sqlResult::::", sqlResult);
        if (sqlResult && sqlResult.length > 0) {
          response.result = sqlResult;
          console.log("response.result::::", response.result);
        }
        response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
        response.data = MESSAGES.CREATE_SUCCESSFUL;
        return callback(null, response);
      }
    );
  } catch (error) {
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.addCategory = addCategory;
