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

let getAllOrders = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  var ordersProductsIdArray = [];
  // let sellerId = null;
  var resultArray = [];
  let constructedQuery;
  //order the orders by create_date

  try {
    console.log("1");
    if (!!msg.status) {
      constructedQuery = `SELECT order_Id, GROUP_CONCAT(product_id) as product_id,GROUP_CONCAT(quantity) as quantity \
    FROM map_order_product \
    WHERE status ="${msg.status}"\
    GROUP BY order_Id \
      ORDER BY create_date ASC`;
      console.log(constructedQuery);
    } else {
      constructedQuery = `SELECT order_Id, GROUP_CONCAT(product_id) as product_id,GROUP_CONCAT(quantity) as quantity \
      FROM map_order_product \
      GROUP BY order_Id \
        ORDER BY create_date ASC`;
      console.log(constructedQuery);
    }

    // query(pool, constructedQuery).then(async (sqlResult) => {
    pool.query(constructedQuery, async (err, sqlResult) => {
      if (sqlResult && sqlResult.length > 0) {
        Object.keys(sqlResult).forEach(function (key) {
          var row = sqlResult[key];
          console.log("Res is2", row);
          var orderProductsIdObj = {};
          var orderProductsIdArray = [];
          var orderProductsQuantityArray = [];
          orderProductsIdObj.orderId = row.order_Id;
          if (row.product_id && String(row.product_id).includes(",")) {
            orderProductsIdObj.orderProductsIdArray = row.product_id.split(",");
          } else {
            orderProductsIdArray.push(row.product_id);
            orderProductsIdObj.orderProductsIdArray = orderProductsIdArray;
          }
          if (row.quantity && String(row.quantity).includes(",")) {
            orderProductsIdObj.orderProductsQuantityArray = row.quantity.split(
              ","
            );
          } else {
            orderProductsQuantityArray.push(row.quantity);
            orderProductsIdObj.orderProductsQuantityArray = orderProductsQuantityArray;
          }
          ordersProductsIdArray.push(orderProductsIdObj);
        });

        var orderCount = 0;

        await ordersProductsIdArray.reduce(async (promise, arrayItem) => {
          await promise;
          var result = {};
          // console.log("OrderId is", arrayItem.orderId);
          var order = await Order.findById(arrayItem.orderId);
          // console.log("Order is", order);
          var productsArr = [];
          // var prodQuantObj = {};
          var quantOrder = 0;
          console.log("Artray", arrayItem.orderProductsIdArray);
          await arrayItem.orderProductsIdArray.reduce(
            async (promise, arrayproItem) => {
              var product;
              var prodQuantObj = {};
              var quantOrder = 0;
              await promise;
              // order.products.forEach((orderTemp) => {
              //   if (orderTemp.productId == arrayproItem) {
              //     prodQuantObj.productTracking = orderTemp;
              //   }
              // });
              await order.products.reduce(async (promise, orderTemp) => {
                if (orderTemp.productId == arrayproItem) {
                  prodQuantObj.productTracking = orderTemp;
                }
              }, Promise.resolve());
              var product = await Product.findById(arrayproItem);
              prodQuantObj.product = await product;
              prodQuantObj.quantity = await ordersProductsIdArray[orderCount]
                .orderProductsQuantityArray[quantOrder];
              console.log("prodQuantObj", arrayproItem, prodQuantObj);
              await productsArr.push(prodQuantObj);

              quantOrder++;
            },
            Promise.resolve()
          );
          result.order = order;
          result.productsArr = productsArr;
          await resultArray.push(result);
          orderCount++;
        }, Promise.resolve());
        response.resultArray = resultArray;
        console.log("resultArray is", resultArray);
        response.status = STATUS_CODE.SUCCESS;
        response.data = MESSAGES.CREATE_SUCCESSFUL;
        return callback(null, response);
      }
    });
  } catch (error) {
    console.log("Error occ while fetching seller orders" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getAllOrders = getAllOrders;
