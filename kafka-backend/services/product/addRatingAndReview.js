"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let addRatingAndReview = async (msg, callback) => {
  let response = {};
  let err = {};
  try {
    var productId = mongoose.Types.ObjectId(msg.productId);
    var reviewAndRating = {
      userId: msg.userId,
      rating: msg.rating,
      review: msg.review,
    };
    Product.updateOne(
      { _id: productId },
      { $push: { reviewAndRatings: reviewAndRating } },
      async function (error, res) {
        if (res) {
          response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
          response.data = MESSAGES.CREATE_SUCCESSFUL;
        }
        if (error) {
          console.log("Error occ while savong product" + error);
          err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
          err.data = MESSAGES.INTERNAL_SERVER_ERROR;
          return callback(err, null);
        }
      }
    );
    let pro = await Product.findOne({ _id: productId });
    if (pro.avgRating) {
      let avgRating = pro.avgRating;
      let noOfRatings = pro.noOfRatings;
      console.log(
        "avg rating: " + avgRating + " and noOfRatings: " + noOfRatings
      );
      avgRating = (avgRating * noOfRatings + msg.rating) / (noOfRatings + 1);
      console.log("avg Rating: ", avgRating);
      await Product.updateOne(
        { _id: productId },
        { $set: { avgRating: avgRating, noOfRatings: noOfRatings + 1 } }
      );
      response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
      response.data = MESSAGES.CREATE_SUCCESSFUL;
      return callback(null, response);
    } else {
      let avgRating = parseInt(msg.rating, 10);
      let noOfRatings = 1;
      console.log(
        "avg rating: " + avgRating + " and noOfRatings: " + noOfRatings
      );
      await Product.updateOne(
        { _id: productId },
        { $set: { avgRating: avgRating, noOfRatings: noOfRatings } }
      );
      response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
      response.data = MESSAGES.CREATE_SUCCESSFUL;
      return callback(null, response);
    }
    // return callback(null, response);
  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.addRatingAndReview = addRatingAndReview;
