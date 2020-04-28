"use strict";
const { getCustomerCards } = require("./getCustomerCards");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "getCustomerCards":
        getCustomerCards(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
