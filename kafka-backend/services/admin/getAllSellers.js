"use strict";
const Seller = require("../../models/seller");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");

let getAllSellers = async (msg, callback) => {
  let response = {};
  let err = {};
  console.log("MSG>SEARCH TERM BEFORE:::", msg.searchTerm);
  if (!msg.searchTerm) {
    msg.searchTerm = "";
  }
  try {
    console.log("msg.searchTerm:::", msg.searchTerm);
    Seller.find({
      sellerName: { $regex: msg.searchTerm, $options: "i" },
    })
      .then((res) => {
        console.log("Sellers found:::::", res);
        response.result = res;
        response.status = STATUS_CODE.SUCCESS;
        response.data = MESSAGES.SUCCESS;
        return callback(null, response);
      })
      .catch((err) => {
        console.log("Error1 ", err);
        return callback(err, null);
      });
  } catch (error) {
    onsole.log("Error2 ", error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getAllSellers = getAllSellers;
