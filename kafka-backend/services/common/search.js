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
    console.log("search term and category", msg);
    let category = "";
    if (msg.searchCategory == "all" || msg.searchCategory == "All") {
    } else {
      category = msg.searchCategory;
    }
    let rating = 0;
    if (msg.rating) {
      rating = parseInt(msg.rating, 10);
    }
    console.log("search term and category", msg);
    let sortOrder = msg.sort;
    let sort = { createDate: 1 };
    if (sortOrder == "priceHigh") {
      sort = {};
      sort["price"] = -1;
    }
    if (sortOrder == "priceLow") {
      sort = {};
      sort["price"] = 1;
    }
    if (sortOrder == "ratingHigh") {
      sort = {};
      sort["avgRating"] = -1;
    }
    if (sortOrder == "ratingLow") {
      sort = {};
      sort["avgRating"] = 1;
    }

    let minPrice = 0;
    let maxPrice = 100000;

    if (msg.minPrice && msg.minPrice != -1) {
      minPrice = msg.minPrice;
    }
    if (msg.maxPrice && msg.maxPrice != -1) {
      maxPrice = msg.maxPrice;
    }
    let sellerId = "";
    if (msg.sellerId) {
      sellerId = msg.sellerId;
    }
    let limit = parseInt(msg.limit);
    let page = parseInt(msg.page);

    let skip = (page - 1) * limit;
    console.log("before search  sort:" + sellerId);
    var products = await Product.find({
      productName: { $regex: msg.searchTerm, $options: "i" },
      category: { $regex: category, $options: "i" },
      avgRating: { $gte: rating },
      isDeleted: 0,
      price: { $gte: minPrice, $lte: maxPrice },
      sellerId: { $regex: sellerId, $options: "i" },
    })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    console.log("search results befe:::", products.length);
    var sellers = await Seller.find({
      sellerName: { $regex: msg.searchTerm, $options: "i" },
    });
    sellers.forEach(async (seller) => {
      let pros = await Product.find({
        sellerId: seller._id,
        category: { $regex: category, $options: "i" },
        avgRating: { $gte: rating },
        isDeleted: 0,
        price: { $gte: minPrice, $lte: maxPrice },
        sellerId: { $regex: sellerId, $options: "i" },
      })
        .sort(sort)
        .skip(skip)
        .limit(limit);
      console.log("pros is =>" + pros.length);
      Array.prototype.push.apply(products, pros);
    });
    console.log("search results:::", products.length);

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
