"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const moment = require("moment");

let saveToMapOrder = async (msg, callback) => {
  console.log("in saveToMapOrder=>", msg);
  let response = {};
  let err = {};
  try {
      var date = new Date();
      var today = date.getFullYear()+"-"+(date.getMonth()+1) + "-" + date.getDate()
      console.log("today is =>"+today)
      var query = "insert into map_order_product (product_id,order_id,quantity,sellerId,status,create_date) "+
      "values ('"+msg.productId+"','"+msg.orderId+"','"+msg.quantity+"','"+msg.sellerId+"','ordered','"+today+"')";
      console.log(" the query is => "+query);
    await pool.query(query, async function (err, result) {
      console.log("Result in mapOrder=>", result+" may be errr=>"+err);
    });
    response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.saveToMapOrder = saveToMapOrder;
