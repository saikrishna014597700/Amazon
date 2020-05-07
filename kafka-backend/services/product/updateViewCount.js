const pool = require("../../utils/mysqlConnection");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const moment = require("moment");
var mongoose = require("mongoose");

let updateViewCount = async (msg, callback) => {
  let response = {};
  let error = {};
  try {
    var date = new Date();
    var today =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let productId = msg.productId;
    console.log("in view count=>", msg);
    var query =
      "insert product_view_mapping (product_id,product_name,create_date) values('" +
      msg.productId +
      "','" +
      msg.productName +
      "','" +
      today +
      "')";
    console.log("in view count query =>", query);
    pool.query(query, async function (err, result) {
      console.log("result is =>", result);
      if (result) {
        response.status = STATUS_CODE.SUCCESS;
        response.data = MESSAGES.UPDATE_SUCCESSFUL;
        return callback(null, response);
      }
      if (err) {
        console.log("Error occ while updating view count", err);
        error.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        error.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(error, null);
      }
    });
  } catch (err) {
    console.log("Error occ while savong product" + error);
    error.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    error.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(error, null);
  }
};

exports.updateViewCount = updateViewCount;
