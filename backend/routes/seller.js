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

router.get("/getOrderDetails/:sellerId", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "get_order_details";
  msg.sellerId = req.params.sellerId;

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("getOrderDetails", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.resultArray);
    }
  });
});

router.get("/getDeliveredOrderDetails/:sellerId", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "get_Delivered_order_details";
  msg.sellerId = req.params.sellerId;

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("getDeliveredOrderDetails", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.resultArray);
    }
  });
});

router.get("/getCancelledOrderDetails/:sellerId", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "get_Cancelled_order_details";
  msg.sellerId = req.params.sellerId;

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("getCancelledOrderDetails", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.resultArray);
    }
  });
});

router.get("/getOpenOrderDetails/:sellerId", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "get_open_order_details";
  msg.sellerId = req.params.sellerId;

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("getOpenOrderDetails", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.resultArray);
    }
  });
});

router.post("/updateSellerTrackingDetails", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "update_seller_tracking_details";
  msg.orderId = req.query.orderId;
  msg.productId = req.query.productId;

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("updateSellerTrackingDetails", msg, function (
    err,
    results
  ) {
    if (err) {
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.result);
    }
  });
});

router.get("/productTrackingDetails", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "product_tracking_details";
  msg.orderId = req.query.orderId;
  msg.productId = req.query.productId;

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("productTrackingDetails", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.result);
    }
  });
});

router.get("/getParticularOrderDetails/:orderId", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "get_particular_order_details";
  msg.orderId = req.params.orderId;

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("getParticularOrderDetails", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.result);
    }
  });
});

router.get("/sellerReports/:sellerId", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body, req.params);
  msg.route = "seller_reports";
  msg.sellerId = req.params.sellerId;

  //   const { error } = validateAccount(req.body);
  //   if (error) {
  //     msg.error = error.details[0].message;
  //     logger.error(msg);
  //     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
  //   }

  kafka.make_request("sellerReports", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      console.log("Result is", results.result);
      return res.status(results.status).send(results.result);
    }
  });
});

module.exports = router;
