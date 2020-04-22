"use strict";
const { signup } = require("./signup");
const {signin} = require("./signin")

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "sign_up":
      signup(msg, callback);
      break;

    case "sign_in":
        signin(msg,callback);
        break;

    
  }
};

exports.handle_request = handle_request;
