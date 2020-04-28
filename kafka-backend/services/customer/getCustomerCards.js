const Product = require("../../models/product");
const customerDetails = require("../../models/customerDetails");
const moment = require("moment");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getCustomerCards = async (msg, callback) => {

    let response = {};
  let err = {};
  var resp = {}
  const today = moment();
  try {
    console.log("user Id:::", msg.userId);
     await customerDetails.find({userId:msg.userId}).then((res)=>{
         resp = res.customerCards
     });
    console.log("card results:::", resp);
    response.result = resp;
    response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);
  } catch (error) {
    console.log("Error occ while fetching cards" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
}

exports.search = getCustomerCards;