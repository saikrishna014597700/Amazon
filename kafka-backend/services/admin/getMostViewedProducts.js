"use strict";
const Seller = require("../../models/seller");
const Order = require("../../models/orders");
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const query = require("../../utils/query");

let getMostViewedProducts = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  response.results = {};
  var ordersProductsIdArray = [];
  // let sellerId = null;
  var resultArray = [];
  let constructedQuery;
  //order the orders by create_date

  try {
    const top10MostViewedProducts = `SELECT count(product_Id) as view_count, product_name, product_Id \
            FROM amazonDB.product_view_mapping \
            where create_date="${msg.date}" \
            GROUP BY product_Id \
            Order by count(product_Id) desc limit 10`;

    resultArray = await query(pool, top10MostViewedProducts).catch((e) => {
      console.log("Error", e);
    });
    response.resultArray = resultArray;
    response.status = STATUS_CODE.SUCCESS;
    response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);
  } catch (error) {
    console.log("Error occ while fetching top10MostViewedProducts" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getMostViewedProducts = getMostViewedProducts;
