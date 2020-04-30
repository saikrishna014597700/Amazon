"use strict";
const { getProductCategories } = require("./getProductCategories");
const { addCategory } = require("./addCategory");
const { deleteCategory } = require("./deleteCategory");
const { getProductsByCategory } = require("./getProductsByCategory");
const { getProductsBySeller } = require("./getProductsBySeller");
const { getAllSellers } = require("./getAllSellers");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "get_product_categories":
      getProductCategories(msg, callback);
      break;
    case "add_category":
      addCategory(msg, callback);
      break;
    case "delete_category":
      deleteCategory(msg, callback);
      break;
    case "products_by_category":
      getProductsByCategory(msg, callback);
      break;
    case "products_by_seller":
      getProductsBySeller(msg, callback);
      break;
    case "get_all_sellers":
      getAllSellers(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
