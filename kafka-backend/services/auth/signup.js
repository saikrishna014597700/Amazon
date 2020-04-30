"use strict";
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const moment= require("moment")
const pool = require("../../utils/mysqlConnection");
const passwordHash = require('password-hash');
var mongoose = require("mongoose");
const customerDetails = require("../../models/customerDetails");
// const sellers= require("../../models/c")


let signup = async (msg, callback) => {
    console.log("in signup",msg)
    let response = {};
    let err = {};
    try {
      if(msg.role=="Customer")
      {   
          pool.query('SELECT * FROM `users` WHERE `email` = ? AND `role` = ?', [msg.email, msg.role],async function(error,result)
          {
              if(result.length)
              {
            response.status = STATUS_CODE.SUCCESS;
            response.data = MESSAGES.CUSTOMER_ALREADY_EXISTS;
            return callback(null, response);
              }
              else
             { console.log("create customer")
             
             let hashedpass= passwordHash.generate(msg.password)
             console.log(hashedpass)
                 var Query = "insert into users (email,password,name,role) values ('" + msg.email + "','"+hashedpass+"','" + msg.name +
                 "','" + "Customer" + "')";
                 var x;
             pool.query(Query,async function(err,result)
             {
                 console.log("Result is",result)
                 x=result.insertId
                 const today=moment()
                 var cNew = new customerDetails({
                  userId: x,
                  firstName: msg.name,
                  createDate: today.format(),
                  updateDate: today.format(),
                });
                await cNew.save()
             });     
            
             response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
             response.data = MESSAGES.CREATE_SUCCESSFUL;
             return callback(null, response);
            }   
      })
    }
      if(msg.role=="Seller")
      {
          
          pool.query('SELECT * FROM `users` WHERE `name` = ?  OR `email` = ? AND `role` = ?', [msg.name, msg.email,msg.role],async function(error,result)
          {
             
              if(result.length)
              {
            response.status = STATUS_CODE.SUCCESS;
            response.data = MESSAGES.SELLER_ALREADY_EXISTS;
            return callback(null, response);
              }
              else
              {
                  console.log("new seller")
                  let hashedpass= passwordHash.generate(msg.password)
                  var Query = "insert into users (email,password,name,role) values ('" + msg.email + "','"+hashedpass+"','" + msg.name +
                 "','" + "Seller" + "')";
             pool.query(Query);  
             response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
             response.data = MESSAGES.CREATE_SUCCESSFUL;
             return callback(null, response);   } 
      })
    }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
}

exports.signup = signup;