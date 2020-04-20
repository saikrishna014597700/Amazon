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

module.exports = router;
