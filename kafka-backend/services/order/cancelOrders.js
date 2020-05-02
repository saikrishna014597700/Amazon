"use strict";
const orders = require("../../models/orders");
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");


let cancelOrders = async (msg, callback) => {
    let response = {};
    let err = {};
    const today = moment();
    try {
      console.log("msg iss", msg , "Queryy::", `update map_order_product set status = "Cancelled" where order_Id =  "${msg.orderId}" and product_id = "${msg.prodId}"`)
     await orders.updateOne({_id:msg.orderId,  products: { $elemMatch: { productId: msg.prodId } }},
     {$set:{"products.$.status": "Cancelled" }}).then(async function (error, res){
        pool.query(`update map_order_product set status = "Cancelled" where order_Id =  "${msg.orderId}" and product_id = "${msg.prodId}"` , async(err,sqlResult) =>{
          if(!err){
          console.log("updated mysql")
          }else{
            console.log("error, error !!", err)
          }
        })

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
  