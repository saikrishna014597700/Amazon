"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let updateCart = async (msg, callback) => {
  console.log("in update Cart", msg);
  let response = {};
  let err = {};
  try {
    if (msg.quantity != 0) {
      pool.query(
        "update cart_details set quantity = ? where user_id = ? and product_id = ?",
        [msg.quantity, msg.userId, msg.productId],
        async function (error, result) {
          response.status = STATUS_CODE.SUCCESS;
          response.data = MESSAGES.UPDATE_SUCCESSFUL;
          return callback(null, response);
        }
      );
    } else {
        pool.query(
            "delete from cart_details where user_id = ? and product_id = ?",
            [msg.userId,msg.productId],
            async function(error,result){
                response.status = STATUS_CODE.SUCCESS;
                response.data = MESSAGES.DELETE_SUCCESSFUL;
                return callback(null,response);
            }
        )
    }
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.updateCart = updateCart;
