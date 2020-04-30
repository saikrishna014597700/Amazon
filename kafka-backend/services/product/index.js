"use strict";
const { addProduct } = require("./addProduct");
const { viewAllSellerProducts } = require("./viewAllSellerProducts");
const { editProduct } = require("./editProduct");
const { deleteProduct } = require("./deleteProduct");
const { getProductDetails } = require("./getProductDetails");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "add_product":
      addProduct(msg, callback);
      break;
    case "view_seller_products":
      viewAllSellerProducts(msg, callback);
      break;
    case "edit_product":
      editProduct(msg, callback);
      break;
    case "get_product_details":
      getProductDetails(msg, callback);
      break;
    case "delete_product":
      deleteProduct(msg, callback);
      break;    
  }
};

exports.handle_request = handle_request;
