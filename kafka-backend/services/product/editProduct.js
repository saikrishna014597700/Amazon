"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let editProduct = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  var resultArray = [];
  try {
    console.log("Product Id is", msg.productObj);
    try {
      var catId;
      var query = `select id from product_categories where category = "${msg.productObj.category}"`;
      console.log("query1", query);
      await pool.query(query, async (err, sqlResult) => {
        if (err) {
          console.log("Error", error);
        }
        console.log("sqlResult", sqlResult);
        if (sqlResult && sqlResult.length > 0) {
          Object.keys(sqlResult).forEach(async function (key) {
            var row = sqlResult[key];
            catId = row.id;
            console.log("Before If", catId);
            if (catId) {
              await Product.replaceOne(
                { _id: msg._id },
                msg.productObj,
                async function (err, replacedPro) {
                  var updateQUERY = `update product_analytics SET product_name = "${msg.productObj.productName}" ,price = ${msg.productObj.price},category_id = ${catId} where product_Id = "${msg.productObj._id}" and order_id ="" `;
                  await pool.query(updateQUERY, async (err, sqlResult) => {
                    console.log("Got Result", sqlResult, updateQUERY);
                    if (sqlResult) {
                      Product.findById(msg._id, function (err, products) {
                        resultArray[0] = products;
                        response.result = resultArray;
                        response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
                        response.data = MESSAGES.CREATE_SUCCESSFUL;
                        return callback(null, response);
                      });
                    } else {
                      response.result = msg.productObj;
                      response.status = STATUS_CODE.SUCCESS;
                      response.data = MESSAGES.DATA_NOT_FOUND;
                      return callback(null, response);
                    }
                  });
                }
              );
            } else {
              console.log("No cat");
            }
          });
        } else {
          response.status = STATUS_CODE.SUCCESS;
          response.data = MESSAGES.DATA_NOT_FOUND;
          return callback(null, response);
        }
      });
    } catch (error) {
      console.log("Error occ while savng product" + error);
      err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
      err.data = MESSAGES.INTERNAL_SERVER_ERROR;
      return callback(err, null);
    }
  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.editProduct = editProduct;
