"use strict";
const Product = require("../../models/product");
const query = require("../../utils/query");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let getProductsByCategory = async (msg, callback) => {
  let response = {};
  let err = {};
  try {
    const constructedQuery = `Select DISTINCT product_Id from product_analytics where category_id =${msg.categoryId};`;
    query(pool, constructedQuery)
      .then(async (sqlResult) => {
        if (sqlResult && sqlResult.length > 0) {
          const productIds = [];
          sqlResult.map((product) => {
            productIds.push(product.product_Id);
          });
          response.result = await Product.find()
            .where("_id")
            .in(productIds)
            .exec();
          response.status = STATUS_CODE.SUCCESS;
          response.data = MESSAGES.SUCCESS;
        } else {
          response.result = "No products in this category";
          response.status = STATUS_CODE.SUCCESS;
          response.data = MESSAGES.ACTION_NOT_COMPLETE;
        }
        return callback(null, response);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  } catch (error) {
    console.log("Error", error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getProductsByCategory = getProductsByCategory;
