"use strict";
// const moment = require("moment");
// var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const redisClient = require("../../utils/redisConfig");

let addCategory = async (msg, callback) => {
  let response = {};
  let err = {};
  // const today = moment();
  try {
    pool.query(
      `INSERT INTO product_categories (category) VALUES ('${msg.categoryName}');`,
      async (err, sqlResult) => {
        redisClient.del("categories", function (err, response) {
          if (response == 1) {
            console.log("Deleted Successfully!");
          } else {
            console.log("Cannot delete");
          }
        });
        if (sqlResult && sqlResult.length > 0) {
          response.result = sqlResult;
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
