"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let deleteCompleteCart = async (msg, callback) => {
  console.log("in addtocart", msg);
  let response = {};
  let err = {};
  try {
    await pool.query("delete from cart_details where user_id = ? ",
    [msg.userId], async function (err, result) {
      console.log("Result is", result);
    });
    response.status = STATUS_CODE.SUCCESS;
    response.data = MESSAGES.DELETE_SUCCESSFUL;
    return callback(null, response);
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.deleteCompleteCart = deleteCompleteCart;
