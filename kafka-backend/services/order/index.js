"use strict";
const { getOrders } = require("./getOrders");
const {cancelOrders} = require ("./cancelOrders")

let handle_request = (msg, callback) => {
    console.log('route is::', msg.route)
  switch (msg.route) {
    
    case "getAllOrders":
        getOrders(msg, callback);
      break;
    case "cancelOrder":
        cancelOrders(msg,callback)
  }
};

exports.handle_request = handle_request;
