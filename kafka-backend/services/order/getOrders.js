"use strict";
const orders = require("../../models/orders");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getOrders = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    
   await orders.find({userId:parseInt(msg.userId)}).then((res)=>{
       console.log('resssss',res)
        response.data = res
        
    })
    response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    //response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);

  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getOrders = getOrders;
