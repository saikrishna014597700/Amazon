"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const moment= require("moment")
const pool = require("../../utils/mysqlConnection");
const passwordHash = require('password-hash');
var mongoose = require("mongoose");
const Product = require("../../models/product");
// const sellers= require("../../models/c")

let userprofile = async (msg, callback) => {
    console.log("in user profile",msg.id)
    let response = {};
    let err = {};
    try {
    var cr = await Product.find({
      reviewAndRatings : {$elemMatch: {userId: msg.id}}
    });
    console.log(cr)
        response.result= cr
        response.status = STATUS_CODE.SUCCESS;
        response.data = MESSAGES.CREATE_SUCCESSFUL;
        return callback(null, response);
     
      
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
}

exports.userprofile = userprofile;