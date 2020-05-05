"use strict";
const { getOrders } = require("./getOrders");
const {cancelOrders} = require ("./cancelOrders")
const {getCancelledOrders} = require ("./getCancelledOrders")

let handle_request = (msg, callback) => {
    console.log('route is::', msg.route)
  switch (msg.route) {
    
    case "getAllOrders":
        getOrders(msg, callback);
      break;
    case "cancelOrder":
        cancelOrders(msg,callback)
        break;
    case "getCancelledOrders":
        getCancelledOrders(msg,callback)
        break;
  }
};

exports.handle_request = handle_request;
