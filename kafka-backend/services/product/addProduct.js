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
    console.log("product is", msg.category);
    // await Product.create();
    var productId;
    await Product.create(productNew, async function (error, results) {
      productId = results._id;
      console.log("results:::", results);
      try {
        var catId;
        var query = `select id from product_categories where category = "${msg.category}"`;
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
                var isertQUERY = `INSERT INTO product_analytics (product_Id,seller_Id,view_Count,price,product_sales_um,quantity,product_name,category_id,create_date) values ("${productId}",${
                  msg.sellerId
                },${msg.price},0,0,0,"${
                  msg.productName
                }",${catId},${today.format("L")})`;
                console.log("Got Cat ID", isertQUERY);
                await pool.query(isertQUERY, async (err, sqlResult) => {
                  console.log("Got Result", sqlResult);
                  if (sqlResult && sqlResult.affectedRows > 0) {
                    response.result = "Added Successfully";
                    response.status = STATUS_CODE.SUCCESS;
                    response.data = MESSAGES.CREATE_SUCCESSFUL;
                    return callback(null, response);
                  } else {
                    response.status = STATUS_CODE.SUCCESS;
                    response.data = MESSAGES.DATA_NOT_FOUND;
                    return callback(null, response);
                  }
                });
              }
            });
          } else {
            //response.status = STATUS_CODE.SUCCESS;
            //response.data = MESSAGES.DATA_NOT_FOUND;
            //return callback(null, response);
            console.log("issue with product_analytics fail");
          }
        });
      } catch (error) {
        console.log("Error occ while fetching seller orders" + error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
      }
    });
  } catch (error) {
    console.log("Error occ while savng product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.addProduct = addProduct;
