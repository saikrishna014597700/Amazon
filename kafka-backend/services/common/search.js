"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let search = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    console.log("Seller Id:::", msg.searchTerm);
    var products = await Product.find({
      productName:{ $regex: msg.searchTerm, $options: "i" }
    });
    console.log("search results:::", products);
    response.result = products;
    response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);
  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.search = search;
