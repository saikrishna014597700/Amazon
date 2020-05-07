"use strict";
const Order = require("../../models/orders");
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let getCancelledOrderDetails = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  var ordersProductsIdArray = [];

  try {
    var resultArray = [];
    pool.query(
      `SELECT order_Id, GROUP_CONCAT(product_id) as product_id,GROUP_CONCAT(quantity) as quantity
    FROM map_order_product
    WHERE sellerId = ${msg.sellerId} AND status = "Cancelled"
    GROUP BY order_Id order by create_date DESC`,
      async (err, sqlResult) => {
        console.log("Cancelled orders", sqlResult);
        if (sqlResult && sqlResult.length > 0) {
          Object.keys(sqlResult).forEach(function (key) {
            var row = sqlResult[key];
            console.log("Res is2", row);
            var orderProductsIdObj = {};
            var orderProductsIdArray = [];
            var orderProductsQuantityArray = [];
            orderProductsIdObj.orderId = row.order_Id;
            if (row.product_id && String(row.product_id).includes(",")) {
              orderProductsIdObj.orderProductsIdArray = row.product_id.split(
                ","
              );
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
            var prodQuantObj = {};
            var quantOrder = 0;
            await arrayItem.orderProductsIdArray.reduce(
              async (promise, arrayproItem) => {
                await promise;
                order.products.forEach((orderTemp) => {
                  console.log("orderTemp", orderTemp.productId, arrayproItem);
                  if (orderTemp.productId == arrayproItem) {
                    console.log("Hii");
                    prodQuantObj.productTracking = orderTemp;
                  }
                });
                console.log("Hii", arrayproItem);
                var product = await Product.findById(arrayproItem);
                prodQuantObj.product = product;
                prodQuantObj.quantity =
                  ordersProductsIdArray[orderCount].orderProductsQuantityArray[
                    quantOrder
                  ];
                await productsArr.push(prodQuantObj);
                // console.log("productsssss is", products);
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
        } else {
          response.status = STATUS_CODE.SUCCESS;
          response.data = MESSAGES.DATA_NOT_FOUND;
          return callback(null, response);
        }
      }
    );
  } catch (error) {
    console.log("Error occ while fetching seller orders" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getCancelledOrderDetails = getCancelledOrderDetails;
