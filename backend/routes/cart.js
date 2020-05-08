"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

router.post("/addToCart",checkAuth, async (req, res) => {
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

router.post("/updateCart",checkAuth, async (req, res) => {
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

router.post("/deleteFromCart",checkAuth, async (req, res) => {
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

router.post("/getCart",checkAuth, async (req, res) => {
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

router.post("/getSaveForLater",checkAuth, async (req, res) => {
  let msg = req.body;
  console.log("get complete cart ==> ", req.body);
  msg.route = "get_save_for_later";
  kafka.make_request("getSaveForLater", msg, function (err, results) {
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

router.post("/postSaveForLater",checkAuth, async (req, res) => {
  let msg = req.body;
  console.log("get complete cart ==> ", req.body);
  msg.route = "post_save_for_later";
  kafka.make_request("postSaveForLater", msg, function (err, results) {
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

router.post("/deleteSaveForLater", checkAuth,async (req, res) => {
  let msg = req.body;
  console.log("delete save for later ==> ", req.body);
  msg.route = "delete_save_for_later";
  kafka.make_request("deleteSaveForLater", msg, function (err, results) {
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

router.post("/saveOrder",checkAuth, async (req, res) => {
  let msg = req.body;
  console.log("saveOrder ==> ", req.body);
  msg.route = "save_order";
  kafka.make_request("saveOrder", msg, function (err, results) {
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

router.post("/deleteCompleteCart",checkAuth, async (req, res) => {
  let msg = req.body;
  console.log("deleteCompleteCart ==> ", req.body);
  msg.route = "delete_complete_cart";
  kafka.make_request("deleteCompleteCart", msg, function (err, results) {
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
router.post("/saveToMapOrder",checkAuth, async (req, res) => {
  let msg = req.body;
  console.log("saveToMapOrder ==> ", req.body);
  msg.route = "save_to_map_order";
  kafka.make_request("saveToMapOrder", msg, function (err, results) {
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
router.post("/saveProductAnalytics",checkAuth, async (req, res) => {
  let msg = req.body;
  console.log("saveProductAnalytics ==> ", req.body);
  msg.route = "save_product_analytics";
  kafka.make_request("saveProductAnalytics", msg, function (err, results) {
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
