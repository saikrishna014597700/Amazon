"use strict";
// const moment = require("moment");
// var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let getProductCategories = async (msg, callback) => {
  let response = {};
  let err = {};
  // const today = moment();
  try {
    pool.query(`select * from product_categories`, async (err, sqlResult) => {
      if (sqlResult && sqlResult.length > 0) {
        response.result = sqlResult;
        console.log("sqlResult::::", sqlResult);
        console.log("sqlResult::::", sqlResult);
      }
      response.status = STATUS_CODE.SUCCESS;
      response.data = MESSAGES.SUCCESS;
      return callback(null, response);
    });
  } catch (error) {
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getProductCategories = getProductCategories;
