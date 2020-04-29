"use strict";
const { signup } = require("./signup");
const {signin} = require("./signin")
const {updatename} =require("./profile")

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "sign_up":
      signup(msg, callback);
      break;

    case "sign_in":
        signin(msg,callback);
        break;

    case "update_name":
        updatename(msg,callback)
        break;

    
  }
};

exports.handle_request = handle_request;
