"use strict";
const { addProduct } = require("./addProduct");
const { viewAllSellerProducts } = require("./viewAllSellerProducts");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "add_product":
      addProduct(msg, callback);
      break;
    case "view_seller_products":
      viewAllSellerProducts(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
