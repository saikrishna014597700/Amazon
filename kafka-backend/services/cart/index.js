"use strict";
const { addToCart } = require("./addToCart");
const { deleteFromCart } = require("./deleteFromCart");
const { updateCart } = require("./updateCart");
const { getCart } = require("./getCart");
const { getCompleteCart } = require("./getCompleteCart");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "add_to_cart":
      addToCart(msg, callback);
      break;
    case "delete_from_cart":
      deleteFromCart(msg, callback);
      break;
    case "update_cart":
      updateCart(msg, callback);
      break;
    case "get_cart":
      getCart(msg, callback);
      break;
    case "get_complete_cart":
      getCompleteCart(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
