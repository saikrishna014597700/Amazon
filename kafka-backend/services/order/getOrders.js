"use strict";
const orders = require("../../models/orders");
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getOrders = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    
   await orders.find({userId:parseInt(msg.userId)}).then(async function (res){
       //console.log('resssss',res)

       var data = res
        var finalOrders = []
       for(var order of res){
          // console.log('order',order)
        order = order.toObject()
        
        
        var productDetails ={}
        var newOrder = {}
        newOrder =  Object.assign(newOrder,order)
        console.log('newOrder',newOrder)
        var prods = newOrder.products
        
        newOrder.products =  await modifyOrdersData(prods,productDetails)
          finalOrders.push(newOrder);
       }
       for (var x of finalOrders){
        console.log('final response::',x.products)
       }
        response.data = finalOrders
        
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


async function modifyOrdersData(prods,productDetails){
    var finalProds = []
    console.log('products', prods)
    for(var prod of prods){
        var newProd = await modifyProductsData(prod)
        finalProds.push(newProd);
    }
    return finalProds
}

async function modifyProductsData(prod){

    var finalProd = {}
    console.log('Prod::',prod)
    await Product.findOne({_id: prod.productId}).then((data)=>{
       var productDetails = data.toObject();
        //prod = prod.toObject();
    finalProd =  Object.assign(finalProd,prod)
    finalProd.productDetails = productDetails;
    console.log("prodss",finalProd )

})
return finalProd
}