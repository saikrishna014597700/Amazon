"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let addToCart = async (msg, callback) => {
  console.log("in addtocart", msg);
  let response = {};
  let err = {};
  try {
    var Query =
      "insert into cart_details (user_id,product_id,quantity) values ('" +
      msg.userId +
      "','" +
      msg.productId +
      "'," +
      msg.quantity +
      ")";
    await pool.query(Query, async function (err, result) {
      console.log("Result is", result);
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

exports.addToCart = addToCart;
