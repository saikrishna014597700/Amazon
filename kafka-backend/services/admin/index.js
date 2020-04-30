"use strict";
const { getProductCategories } = require("./getProductCategories");
const { addCategory } = require("./addCategory");
const { deleteCategory } = require("./deleteCategory");
const { getProductsByCategory } = require("./getProductsByCategory");

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
  }
};

exports.handle_request = handle_request;
