"use strict";
const { getProductCategories } = require("./getProductCategories");
const { addCategory } = require("./addCategory");
const { deleteCategory } = require("./deleteCategory");
const { getProductsByCategory } = require("./getProductsByCategory");
const { getProductsBySeller } = require("./getProductsBySeller");
const { getAllSellers } = require("./getAllSellers");
const { getAllOrders } = require("./getAllOrders");
const { getOrdersBySellerName } = require("./getOrdersBySellerName");
const { getReports } = require("./getReports");
const { getMostViewedProducts } = require("./getMostViewedProducts");

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
    case "get_all_orders":
      getAllOrders(msg, callback);
      break;
    case "orders_by_seller_name":
      getOrdersBySellerName(msg, callback);
      break;
    case "reports":
      getReports(msg, callback);
      break;
    case "most_viewed_products":
      getMostViewedProducts(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
