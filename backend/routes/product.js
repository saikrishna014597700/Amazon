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

router.get("/getProductDetails/:productId", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "get_product_details";
  msg.productId = req.params.productId;

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("getProductDetails", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.result);
    }
  });
});

router.post("/editProduct", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "edit_product";

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("editProduct", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      console.log("Product issss", results.result);
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.result);
    }
  });
});

router.post("/deleteProduct", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "delete_product";

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("deleteProduct", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      console.log("Product issss", results.result);
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.result);
    }
  });
});

router.post("/addProduct", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body);
  msg.route = "add_product";

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("addProduct", msg, function (err, results) {
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

router.post("/viewAllSellerProducts", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body);
  msg.route = "view_seller_products";

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("addProduct", msg, function (err, results) {
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

router.get("/getProductDetails", async (req, res) => {
  let msg = req.body;
  msg.productId = req.query.productId;
  console.log("request for get product details->", msg);
  msg.route = "get_product_details";
  kafka.make_request("getProductDetais", msg, function (err, results) {
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
module.exports = router;
