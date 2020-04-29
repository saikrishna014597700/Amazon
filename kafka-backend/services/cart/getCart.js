"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let getCart = async (msg, callback) => {
  console.log("in get Cart", msg);
  let response = {};
  let err = {};
  try {
    var Query =
      "select * from cart_details where user_id='" +
      msg.userId +
      "' " +
      "and product_id='" +
      msg.productId +
      "'";
    console.log("query is =>" + Query);
    await pool.query(Query, async function (err, result) {
      console.log("Result is", result);
      response.status = STATUS_CODE.SUCCESS;
      let data = result;
      console.log("data=>"+JSON.stringify(data))
      response.data = data;
      return callback(null, response);
    });
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getCart = getCart;
