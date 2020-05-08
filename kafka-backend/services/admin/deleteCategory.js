"use strict";
// const moment = require("moment");
// var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const query = require("../../utils/query");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const redisClient = require("../../utils/redisConfig");

let deleteCategory = async (msg, callback) => {
  let response = {};
  let err = {};
  try {
    const constructedQuery = `Select DISTINCT product_Id from product_analytics where category_id =${msg.categoryId};`;
    const deleteQuery = `Delete from product_categories where id=${msg.categoryId}`;
    query(pool, constructedQuery)
      .then(async (sqlResult) => {
        if (sqlResult.length == 0) {
          await await query(pool, deleteQuery).then((result) => {
            redisClient.del("categories", function (err, response) {
              if (response == 1) {
                console.log("Deleted Successfully!");
              } else {
                console.log("Cannot delete");
              }
            });
            response.result = "Deleted successfully";
            response.status = STATUS_CODE.SUCCESS;
            response.data = MESSAGES.DELETE_SUCCESSFUL;
          });
        } else {
          response.result = "Category with existing products cannot be deleted";
          response.status = STATUS_CODE.SUCCESS;
          response.data = MESSAGES.ACTION_NOT_COMPLETE;
        }
        return callback(null, response);
      })
      .catch((e) => {
        console.log("Error", e);
      });

    // pool.query(
    //   `Select DISTINCT product_Id from product_analytics where category_id =${msg.categoryId};`,
    //   async (err, sqlResult) => {
    //     console.log("sqlResult::::", sqlResult);
    //     if (sqlResult && sqlResult.length > 0) {
    //       response.result = sqlResult;
    //       console.log("response.result::::", response.result);
    //     }
    //     response.status = STATUS_CODE.SUCCESS;
    //     response.data = MESSAGES.DELETE_SUCCESSFUL;
    //     return callback(null, response);
    //   }
    // );
  } catch (error) {
    console.log("Errorrr2", error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.deleteCategory = deleteCategory;
