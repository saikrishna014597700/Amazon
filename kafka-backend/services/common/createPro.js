"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let createPro = async (msg, callback) => {
  
  try {
      var i=0;
    for(i=1;i<9300;i++){
        var product = new Product({
            productName:"product"+String(i),
            productDesc:"ABC",
            price:"55",
            sellerId:"123"
        });
        console.log("yo here tooo=>"+i);
        await product.save();
    }
    // response.result = products;
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

exports.createPro = createPro;
