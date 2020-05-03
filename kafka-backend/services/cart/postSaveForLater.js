"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let postSaveForLater = async (msg, callback) => {
  console.log("in post save for later", msg);
  let response = {};
  let err = {};
  try {
    var Query =
      "insert into save_for_later (user_id,product_id) values ('" +
      msg.userId +
      "','" +
      msg.productId +
      "')";

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

exports.postSaveForLater = postSaveForLater;
