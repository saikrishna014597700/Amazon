"use strict";
const orders = require("../../models/orders");
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getOpenOrders = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();

  var resultArray = []
  try {
    
   await orders.find({userId:parseInt(msg.userId)}).then(async function (res){
       //console.log('resssss',res)
      
      
       var data = res
        var finalOrders = []
       for(var order of res){
          // console.log('order',order)
        var result = {}
        order = order.toObject()
        
        result.order = order
        var productDetails ={}
        var prods = order.products
        
        var productsArr =  await modifyOrdersData(prods,productDetails)
        result.productsArr = productsArr
        //console.log('productsArr returning::',productsArr )
        if(result.productsArr.length>0){
            resultArray.push(result);
            }
       }
       
       
        
    })

   // console.log('resultArray::', resultArray)
    response.resultArray = resultArray
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

exports.getOpenOrders = getOpenOrders;


async function modifyOrdersData(prods,productDetails){
    var productsArr = []
    //console.log('products', prods)
    for(var prod of prods){
      var prodQuantObj = {}
      prodQuantObj.quantity = prod.quantity;
      prodQuantObj.status = prod.status
      if(prod.status === "Shipped" || prod.status === "Ordered" || prod.status === "ordered"){
      prodQuantObj = await modifyProductsData(prod,prodQuantObj)
      productsArr.push(prodQuantObj);
      }
    }
   // console.log('productsArr::::',productsArr)
    return productsArr
}

async function modifyProductsData(prod,prodQuantObj){

    var finalProd = {}
    //console.log('Prod::',prod)
    await Product.findOne({_id: prod.productId}).then((data)=>{
       var productDetails = data.toObject();
        //prod = prod.toObject();
        prodQuantObj.quantity = prodQuantObj.quantity
        prodQuantObj.product = productDetails;
    //finalProd =  Object.assign(finalProd,prod)
    //finalProd.productDetails = productDetails;
    //console.log("prodss",prodQuantObj )

})
return prodQuantObj
}