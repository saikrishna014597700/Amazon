"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let getCompleteCart = async (msg, callback) => {
  console.log("in get Cart", msg);
  let response = {};
  let err = {};
  try {
    await pool.query(
      "select * from cart_details where user_id = ?",
      [msg.userId],
      async function (err, result) {
        console.log("Result from get cart", result);
        response.status = STATUS_CODE.SUCCESS;
        let data = result;
        console.log("data=>" + JSON.stringify(data));
        response.data = data;
        return callback(null, response);
      }
    );
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getCompleteCart = getCompleteCart;
