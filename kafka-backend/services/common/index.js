"use strict";
const { search } = require("./search");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "search":
      search(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
