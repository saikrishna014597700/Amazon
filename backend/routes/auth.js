"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const pool = require("../utils/mysqlConnection");
// const { checkAuth } = require("../utils/passport");
const { secret } = require('../utils/config');
const { validateAccount } = require("../validations/accountValidations");
const { STATUS_CODE, MESSAGES } = require("../utils/constants");
const logger = require("../utils/logger");
const jwt = require('jsonwebtoken');
const { auth } = require("../utils/passport");
const cookie= require('react-cookies')
auth();


/**
 * to deactivate an account
 * @param req: user_id
 */

router.post("/signup", async (req, res) => {
  let msg = req.body;
  console.log("Req body for signup", req.body);
  msg.route = "sign_up";

  kafka.make_request("signup", msg, function (err, results) {
    console.log("Results are",results);
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.data);
      
    }
  });
});

router.post("/profile", async (req, res) => {
  let msg = req.body;
  console.log("Req body for profile", req.body);
  msg.route = "update_name";

  kafka.make_request("updatename", msg, function (err, results) {
    console.log("Results are",results);
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.data);
      
    }
  });
});

router.post("/signin", async (req, res) => {
  let msg = req.body;
  console.log("Req body for signin", req.body);
  msg.route = "sign_in";

  kafka.make_request("signin", msg, function (err, results) {
    console.log("Results are",results);
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      if(results.data=="Invalid Inputs")
      return res.status(results.status).send(results.data);

      if(results.data=="Successful")
      {
        const payload = {
          user_id: req.body.email,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: 900000 // in seconds
        });
        let jwtToken = 'JWT ' + token;
        res.status = STATUS_CODE.SUCCESS;
        res.token = jwtToken;
  
        return res.send({id:results.id,role:results.role,token:jwtToken,name:results.name})

      }
      
    }
  });
});


module.exports = router;