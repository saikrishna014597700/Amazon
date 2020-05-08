"use strict";
const { getCustomerCards } = require("./getCustomerCards");
const { saveCustomerCards } = require("./saveCustomerCards");
const { deleteCustomerCard } = require("./deleteCustomerCard");
const { getCustomerAddresses } = require("./getCustomerAddresses");
const { saveCustomerAddresses } = require("./saveCustomerAddresses");
const { deleteCustomerAddress } = require("./deleteCustomerAddress");
const { getCustomerDetails } = require("./getCustomerDetails");

let handle_request = (msg, callback) => {
  console.log(msg)
  console.log("route::", msg.route);
  switch (msg.route) {
    case "getCustomerCards":
      getCustomerCards(msg, callback);
      break;
    case "saveCustomerCards":
      saveCustomerCards(msg, callback);
      break;
    case "deleteCustomerCard":
      deleteCustomerCard(msg, callback);
      break;
    case "getCustomerAddresses":
      getCustomerAddresses(msg, callback);
      break;
    case "saveCustomerAddresses":
      saveCustomerAddresses(msg, callback);
      break;
    case "deleteCustomerAddress":
      deleteCustomerAddress(msg, callback);
      break;
    case "get_customer_details":
      getCustomerDetails(msg,callback);
      break;
  }
};

exports.handle_request = handle_request;
