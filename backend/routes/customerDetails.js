"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const pool = require("../utils/mysqlConnection");
// const { checkAuth } = require("../utils/passport");
const { validateAccount } = require("../validations/accountValidations");
const { STATUS_CODE, MESSAGES } = require("../utils/constants");
const logger = require("../utils/logger");

/**
 * to deactivate an account
 * @param req: user_id
 */
router.get("/getCustomerCards", async (req, res) => {
  let msg = req.body;
  msg.userId = req.query.userId
  console.log("msg ", msg);
  msg.route = "getCustomerCards";
  kafka.make_request("getCustomerCards", msg, function (err, results) {
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


router.post("/saveCustomerCards", async (req, res) => {
  let msg = req.body;
  msg.userId = req.query.userId
  console.log("msg ", msg);
  msg.route = "saveCustomerCards";
  kafka.make_request("saveCustomerCards", msg, function (err, results) {
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

router.post("/deleteCustomerCard", async (req, res) => {
  let msg = req.body;
  msg.userId = req.query.userId
  console.log("msg ", msg);
  msg.route = "deleteCustomerCard";
  kafka.make_request("deleteCustomerCard", msg, function (err, results) {
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


router.get("/getCustomerAddresses", async (req, res) => {
  let msg = req.body;
  msg.userId = req.query.userId
  console.log("msg ", msg);
  msg.route = "getCustomerAddresses";
  kafka.make_request("getCustomerAddresses", msg, function (err, results) {
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


router.post("/saveCustomerAddresses", async (req, res) => {
  let msg = req.body;
  msg.userId = req.query.userId
  console.log("msg ", msg);
  msg.route = "saveCustomerAddresses";
  kafka.make_request("saveCustomerAddresses", msg, function (err, results) {
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

router.post("/deleteCustomerAddress", async (req, res) => {
  let msg = req.body;
  msg.userId = req.query.userId
  console.log("msg ", msg);
  msg.route = "deleteCustomerAddress";
  kafka.make_request("deleteCustomerAddress", msg, function (err, results) {
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




module.exports= router;