"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const moment = require("moment");
const pool = require("../../utils/mysqlConnection");
const passwordHash = require("password-hash");
// const bcrypt = require('bcrypt');

let signin = async (msg, callback) => {
  console.log("in signin", msg);
  let response = {};
  let err = {};
  try {
    pool.query(
      "SELECT * FROM `users` WHERE `email` = ? ",
      [msg.email],
      async function (error, result) {
        // console.log(result[0].password)

        // console.log("results from sigin",passwordHash.verify(msg.password,result[0].password))
        if (result.length) {
          if (passwordHash.verify(msg.password, result[0].password)) {
            console.log("hash worked");
            response.status = STATUS_CODE.SUCCESS;
            if (result[0].role == "Customer") {
              response.data = MESSAGES.SUCCESS;
            } else if (result[0].role == "Seller")
              response.data = MESSAGES.SUCCESS;

            response.name = result[0].name;
            response.id = result[0].id;
            response.role = result[0].role;
            if(result[0].imagePath!=null) 
            {
              response.imagePath = result[0].imagePath;
            }
            return callback(null, response);
          } else {
            response.status = STATUS_CODE.SUCCESS;
            response.data = MESSAGES.INVALID_INPUTS;
            return callback(null, response);
          }
        } else {
          response.status = STATUS_CODE.SUCCESS;
          response.data = MESSAGES.INVALID_INPUTS;
          return callback(null, response);
        }
      }
    );
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.signin = signin;
