"use strict";
const Product = require("../../models/product");
const Seller = require("../../models/seller");
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
      productName: { $regex: msg.searchTerm, $options: "i" },
    });
    var sellers = await Seller.find({
      sellerName : { $regex: msg.searchTerm, $options : "i" }
    });
    sellers.forEach(async (seller)=>{
      let pros = await Product.find({
        sellerId: seller._id
      });
      console.log("pros is =>"+pros.length);
      Array.prototype.push.apply(products, pros);
    });
    let limit = msg.limit;
    let page = msg.page;
    let startIndex = (page-1)*10;
    console.log("search results:::", products.length);

    response.result = products.slice(startIndex,startIndex+limit);
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
