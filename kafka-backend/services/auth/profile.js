"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const moment= require("moment")
const pool = require("../../utils/mysqlConnection");
const passwordHash = require('password-hash');
var mongoose = require("mongoose");
const customerDetails = require("../../models/customerDetails");
// const sellers= require("../../models/c")


let updatename = async (msg, callback) => {
    console.log("in profile name",msg)
    let response = {};
    let err = {};
    try {
        pool.query('UPDATE `users` set `name`=? WHERE `id` = ? ', [msg.name,msg.id],async function(error,result)
        {
            console.log(result)
        })
        await customerDetails.updateOne({userId:msg.id},{firstName:msg.name})
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

exports.updatename = updatename;