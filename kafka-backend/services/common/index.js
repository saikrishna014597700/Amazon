"use strict";
const { search } = require("./search");
const { productSearchBDSK } = require("./productSearchBDSK");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "search":
      search(msg, callback);
      break;
    case "productSearchBDSK":
      productSearchBDSK(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
