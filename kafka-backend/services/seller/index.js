"use strict";
const { getSellerOrders } = require("./getSellerOrders");
const { getDeliveredOrderDetails } = require("./getDeliveredOrderDetails");
const { getCancelledOrderDetails } = require("./getCancelledOrderDetails");
const { getOpenOrderDetails } = require("./getOpenOrderDetails");
const { sellerReports } = require("./sellerReports");
const {
  updateSellerTrackingDetails,
} = require("./updateSellerTrackingDetails");
const { productTrackingDetails } = require("./productTrackingDetails");
const { getParticularOrderDetails } = require("./getParticularOrderDetails");
const { updateProfile } = require("./updateProfile");
// const { addAddress } = require("./addAddress");
const { getSellerProfile } = require("./sellerProfile");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "get_order_details":
      getSellerOrders(msg, callback);
      break;
    case "get_Delivered_order_details":
      getDeliveredOrderDetails(msg, callback);
      break;
    case "get_Cancelled_order_details":
      getCancelledOrderDetails(msg, callback);
      break;
    case "get_open_order_details":
      getOpenOrderDetails(msg, callback);
      break;
    case "get_particular_order_details":
      getParticularOrderDetails(msg, callback);
      break;
    case "product_tracking_details":
      productTrackingDetails(msg, callback);
      break;
    case "seller_reports":
      sellerReports(msg, callback);
      break;
    case "update_seller_tracking_details":
      updateSellerTrackingDetails(msg, callback);
      break;
    case "update_profile":
      updateProfile(msg, callback);
      break;
    case "add_address":
      addAddress(msg, callback);
      break;
    case "seller_profile":
      getSellerProfile(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
