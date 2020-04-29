const Product = require("../../models/product");
const customerDetails = require("../../models/customerDetails");
// const customerDetails = require("../../models/customerDetails");
const moment = require("moment");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getCustomerAddresses = async (msg, callback) => {

    let response = {};
  let err = {};
  var addresses = []
  const today = moment();
  try {
    console.log("user Id:::", msg.userId);
     await customerDetails.findOne({userId: msg.userId}).then((res)=>{
         console.log("res", res)
         addresses = res.toObject().customerAddresses
     });
    console.log("addresses results:::", addresses);
    response.data = addresses;
    response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    //response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);
  } catch (error) {
    console.log("Error occ while fetching addresses" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
}

exports.getCustomerAddresses = getCustomerAddresses;