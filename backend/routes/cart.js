"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
// const { validateAccount } = require("../validations/accountValidations");
const logger = require("../utils/logger");

router.post("/addToCart", async (req, res) => {
  let msg = req.body;
  console.log("addToCart ==> ", req.body);
  msg.route = "add_to_cart";
  kafka.make_request("addToCart", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      console.log("Result:::", results);
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.result);
    }
  });
});

router.post("/updateCart", async (req, res) => {
  let msg = req.body;
  console.log("updateCart ==> ", req.body);
  msg.route = "update_cart";
  kafka.make_request("updateCart", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      console.log("Result:::", results);
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.result);
    }
  });
});

router.post("/deleteFromCart", async (req, res) => {
  let msg = req.body;
  console.log("deleteFromCart ==> ", req.body);
  msg.route = "delete_from_cart";
  kafka.make_request("deleteFromCart", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      console.log("Result:::", results);
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.result);
    }
  });
});

router.post("/getCart", async (req, res) => {
  let msg = req.body;
  console.log("getCart ==> ", req.body);
  msg.route = "get_cart";
  kafka.make_request("getCart", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      console.log("Result:::", results);
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.data);
    }
  });
});

router.post("/getCompleteCart", async (req, res) => {
  let msg = req.body;
  console.log("get complete cart ==> ", req.body);
  msg.route = "get_complete_cart";
  kafka.make_request("getCompleteCart", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      console.log("Result:::", results);
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.data);
    }
  });
});

module.exports = router;
