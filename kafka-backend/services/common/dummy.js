"use strict";
const Product = require("../../models/product");
const Seller = require("../../models/seller");
const moment = require("moment");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let dummy = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    console.log("search term and category", msg);

    // let avgRating = "4.2";
    // let rating = {
    //   userId: "22",
    //   review: "good product!",
    //   rating: 4.2,
    // };
    var products = await Product.find(
      {
        productName: { $regex: "", $options: "i" },
      }
    );

    products.forEach( async product =>{
      var price = 0;
      if(isNaN(product.price))
        price = 30;
      else
        price = parseInt(product.price);
      await Product.updateOne(
        {
          productName:  product.productName,
        },
        {$set:{price:price}}
      );
    })

    // response.result = products.slice(startIndex, startIndex + limit);
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

exports.dummy = dummy;
