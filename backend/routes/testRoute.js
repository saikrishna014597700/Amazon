"use strict";
const express = require("express");
const Product = require("./productModel");
const router = express.Router();
const kafka = require("../kafka/client");
const pool = require("../utils/mysqlConnection");
// const { checkAuth } = require("../utils/passport");
const { validateAccount } = require("../validations/accountValidations");
const { STATUS_CODE, MESSAGES } = require("../utils/constants");
const logger = require("../utils/logger");
const mongoose = require("mongoose");
const redisClient = require("./redisConfig");

/**
 * to deactivate an account
 * @param req: user_id
 */

router.get("/productSearchBDSK", async (req, res) => {
  let msg = req.body;
  console.log("search ==> ", req.body);
  msg.route = "productSearchBDSK";
  msg.searchValue = req.query.productName;
  kafka.make_request("productSearchBDSK", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      //   console.log("Result:::", results);
      msg.status = results.status;
      logger.info(msg);
      return res.status(200).send(results.result);
    }
  });
});

router.get("/productSearchBD", async (req, res) => {
  let serachValue = req.query.productName;
  var products = await Product.find({
    productName: { $regex: serachValue, $options: "i" },
  });
  //   console.log("search results:::", products);
  return res.status(200).send(products);
});

router.get("/productSearchBDS", async (req, res) => {
  redisClient.get("productSearchBDS", async (err, products) => {
    if (err) {
      console.log("Redis Error", err);
    }
    if (products) {
      console.log("Getting results from redis");
      return res.status(200).send(products);
    } else {
      console.log("Not Getting results from redis");
      let serachValue = req.query.productName;
      var products = await Product.find({
        productName: { $regex: serachValue, $options: "i" },
      });
      redisClient.setex("productSearchBDS", 36000, JSON.stringify(products));
      return res.status(200).send(products);
    }
  });
});

router.get("/productSearchB", async (req, res) => {
  let serachValue = req.query.productName;

  var products = await Product.find({
    productName: { $regex: serachValue, $options: "i" },
  });
  //   console.log("search results:::", products);
  return res.status(200).send(products);
});

module.exports = router;
