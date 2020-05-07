"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const moment = require("moment");

let saveProductAnalytics = async (msg, callback) => {
  console.log("in saveToMapOrder=>", msg);
  let response = {};
  let err = {};
  try {
      var date = new Date();
      var today = date.getFullYear()+"-"+(date.getMonth()+1) + "-" + date.getDate()
      console.log("today is =>"+today)
      var salesSum = parseInt(msg.quantity,10) * parseInt(msg.price,10)
      var query = "insert into product_analytics (product_id,order_id,seller_id,price,quantity,product_sales_um,product_name,user_id,create_date) "+
      "values ('"+msg.productId+"','"+msg.orderId+"',"+msg.sellerId+","+msg.price+","+msg.quantity+","+salesSum+",'"+msg.productName+"','"+msg.userId+"','"+today+"')";
      console.log(" the query is => "+query);
      await pool.query(query, async function (err, result) {
      console.log("Result in product ANalytics=>", result+" may be errr=>"+err);
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

exports.saveProductAnalytics = saveProductAnalytics;
