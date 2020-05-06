"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let addProduct = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    var productNew = new Product({
      productName: msg.productName,
      productDesc: msg.productDesc,
      price: msg.price,
      category: msg.category,
      isDeleted: 0,
      sellerId: msg.sellerId,
      createDate: today.format(),
      updateDate: today.format(),
    });
    console.log("product is", productNew);
    // await Product.create();
    var productId;
    await Product.create(productNew, async function (error, results) {
      productId = results._id;
      console.log("results:::",results)
      try {
        await pool.query(`INSERT INTO product_analytics`, async (err, sqlResult) => {
          if (sqlResult && sqlResult.length > 0) {
            // response.status = STATUS_CODE.SUCCESS;
            // response.data = MESSAGES.CREATE_SUCCESSFUL;
            // return callback(null, response);
            console.log("issue with product_analytics success")
          } else {
            //response.status = STATUS_CODE.SUCCESS;
            //response.data = MESSAGES.DATA_NOT_FOUND;
            //return callback(null, response);
            console.log("issue with product_analytics fail")
          }
        });
      } catch (error) {
        console.log("Error occ while fetching seller orders" + error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
      }

      response.result = productId;
      response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
      response.data = MESSAGES.CREATE_SUCCESSFUL;
      console.log("response in backend is =>" + JSON.stringify(response));
      return callback(null, response);
    });
    return callback(null, response);
  } catch (error) {
    console.log("Error occ while savng product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.addProduct = addProduct;
