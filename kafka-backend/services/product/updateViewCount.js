const pool = require("../../utils/mysqlConnection");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let updateViewCount = async (msg, callback) => {
  let response = {};
  let error = {};
  try {
    let productId = msg.productId;
    console.log("in view count=>"+productId)
    pool.query(
      "update product_analytics set view_Count = view_Count+1 where product_Id=? and order_id=''",
      [productId],
      async function (err, result) {
        console.log("result is =>", result);
        if (result) {
          response.status = STATUS_CODE.SUCCESS;
          response.data = MESSAGES.UPDATE_SUCCESSFUL;
          return callback(null, response);
        }
        if (err) {
          console.log("Error occ while savong product" + err);
          error.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
          error.data = MESSAGES.INTERNAL_SERVER_ERROR;
          return callback(error, null);
        }
      }
    );
  } catch (err) {
    console.log("Error occ while savong product" + error);
    error.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    error.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(error, null);
  }
};

exports.updateViewCount = updateViewCount;
