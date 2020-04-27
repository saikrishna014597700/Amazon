"use strict";
const orders = require("../../models/orders");
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");



let cancelOrders = async (msg, callback) => {
    let response = {};
    let err = {};
    const today = moment();
    try {
      console.log("msg iss", msg )
     await orders.updateOne({_id:msg.orderId,  products: { $elemMatch: { productId: msg.prodId } }},
     {$set:{"products.$.status": "Cancelled" }}).then(async function (error, res){
         console.log('resssss', res, "Error:", error )
          response.data = "Cancelled the Product!"
          
      })
      response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
      //response.data = MESSAGES.CREATE_SUCCESSFUL;
      return callback(null, response);
  
    } catch (error) {
      console.log("Error occ while cancelling product" + error);
      err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
      err.data = MESSAGES.INTERNAL_SERVER_ERROR;
      return callback(err, null);
    }
  };
  
  exports.cancelOrders = cancelOrders;
  