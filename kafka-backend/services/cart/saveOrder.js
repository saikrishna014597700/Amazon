"use strict";
const Order = require("../../models/orders");
const moment = require("moment");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let saveOrder = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    let data = msg;
    data.createDate = today;
    data.updateDate = today;
    console.log("in save Order:" + JSON.stringify(msg));
    // var orderNew = new Order(data);
    let orderStatus = "";
    await Order.create(data, function (error, results) {
      console.log("in order create results=>" + JSON.stringify(results));
      orderStatus = results._id;
      console.log("orderStatus===>" + orderStatus);
      response.result = orderStatus;
      response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
      response.data = MESSAGES.CREATE_SUCCESSFUL;
      console.log("response in backend is =>"+JSON.stringify(response))
      return callback(null, response);
    });
    // await orderNew.save();
  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.saveOrder = saveOrder;
