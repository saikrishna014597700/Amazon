"use strict";
const { getOrders } = require("./getOrders");

let handle_request = (msg, callback) => {
    console.log('route is::', msg.route)
  switch (msg.route) {
    
    case "getAllOrders":
        getOrders(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
