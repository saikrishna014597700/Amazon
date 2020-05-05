"use strict";
const { addToCart } = require("./addToCart");
const { deleteFromCart } = require("./deleteFromCart");
const { updateCart } = require("./updateCart");
const { getCart } = require("./getCart");
const { getCompleteCart } = require("./getCompleteCart");
const { getSaveForLater } = require("./getSaveForLater");
const { postSaveForLater } = require("./postSaveForLater");
const { deleteSaveForLater } = require("./deleteSaveForLater");
const { saveOrder } = require("./saveOrder");
const { deleteCompleteCart } = require("./deleteCompleteCart");

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
    case "get_save_for_later":
      getSaveForLater(msg, callback);
      break;
    case "post_save_for_later":
      postSaveForLater(msg, callback);
      break;
    case "delete_save_for_later":
      deleteSaveForLater(msg, callback);
      break;
    case "save_order":
      saveOrder(msg, callback);
      break;
    case "delete_complete_cart":
      deleteCompleteCart(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
