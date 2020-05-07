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
router.post("/cancelOrder", async (req, res) => {
  let msg = req.body;
  console.log("Req ody for add Pr", req.body);
  msg.route = "cancelOrder";
  kafka.make_request("cancelOrder", msg, function (err, results) {
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

router.get("/getAllOrders", async (req, res) => {
    let msg = req.body;
    msg.userId = req.query.userId
    console.log("Req param", req.query.userId);
    msg.route = "getAllOrders";
    await kafka.make_request("getAllOrders", msg, function (err, results) {
      if (err) {
        msg.error = err.data;
        logger.error(msg);
        return res.status(err.status).send(err.data);
      } else {
        msg.status = results.status;
        logger.info(msg);
        return res.status(results.status).send(results.resultArray);
      }
    });
  });

  router.get("/getCancelledOrders", async (req, res) => {
    let msg = req.body;
    msg.userId = req.query.userId
    console.log("Req param", req.query.userId);
    msg.route = "getCancelledOrders";
    await kafka.make_request("getCancelledOrders", msg, function (err, results) {
      if (err) {
        msg.error = err.data;
        logger.error(msg);
        return res.status(err.status).send(err.data);
      } else {
        msg.status = results.status;
        logger.info(msg);
        return res.status(results.status).send(results.resultArray);
      }
    });
  });


  router.get("/getOpenOrders", async (req, res) => {
    let msg = req.body;
    msg.userId = req.query.userId
    console.log("Req param", req.query.userId);
    msg.route = "getOpenOrders";
    await kafka.make_request("getOpenOrders", msg, function (err, results) {
      if (err) {
        msg.error = err.data;
        logger.error(msg);
        return res.status(err.status).send(err.data);
      } else {
        msg.status = results.status;
        logger.info(msg);
        return res.status(results.status).send(results.resultArray);
      }
    });
  });
  


module.exports = router;
