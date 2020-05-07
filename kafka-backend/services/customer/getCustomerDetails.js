const Product = require("../../models/product");
const customerDetails = require("../../models/customerDetails");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getCustomerDetails = async (msg, callback) => {
    let response = {};
  try {
    var id = mongoose.Types.ObjectId(msg._id);
    console.log("msg User Id =>"+msg.userId);
    await customerDetails
      .findOne({ userId: parseInt(msg.userId, 10) })
      .then((res) => {
        console.log("customer details results:::", res);
        response.data = res;
        response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
        return callback(null, response);
      });
  } catch (error) {
    console.log("Error occ while fetching addresses" + error);
    error.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    error.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(error, null);
  }
};

exports.getCustomerDetails = getCustomerDetails;
