"use strict";
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let viewAllSellerProducts = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  try {
    console.log("Seller Id:::", msg.sellerId);
    var sellerProducts = await Product.find({
      sellerId: msg.sellerId,
    });
    console.log("Seller Products:::", sellerProducts);

    // let tweet = await Tweets.findById(msg.tweet_id);
    // let user = await Users.findById(msg.user_id);

    // if (!tweet || !user) {
    //   err.status = STATUS_CODE.BAD_REQUEST;
    //   err.data = MESSAGES.DATA_NOT_FOUND;
    //   return callback(err, null);
    // }

    // if (user.bookmarks.includes(msg.tweet_id)) {
    //   err.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    //   err.data = MESSAGES.CREATE_SUCCESSFUL;
    //   return callback(err, null);
    // } else {
    //   let userUpdated = await Users.findByIdAndUpdate(msg.user_id, {
    //     $push: { bookmarks: msg.tweet_id },
    //   });

    //   if (!userUpdated) {
    //     throw err;
    //   } else {
    //     let bookmarks = await Users.findById(msg.user_id, {
    //       bookmarks: 1,
    //       _id: 0,
    //     }).populate({
    //       path: "bookmarks",
    //       populate: {
    //         path: "tweet_owner",
    //         model: "User",
    //         select: "first_name last_name user_name user_image",
    //       },
    //     });
    //     let formattedBookmarks = [];
    //     bookmarks.bookmarks.map((tweet) => {
    //       formattedBookmarks.push(a
    //         Object.assign({}, tweet._doc, {
    //           likes_count: tweet.likes.length,
    //           retweets_count: tweet.retweeters.length,
    //           replies_count: tweet.replies.length,
    //         })
    //       );
    //     });
    // redisClient.setex(
    //   msg.user_id,
    //   36000,
    //   JSON.stringify(formattedBookmarks)
    // );
    response.result = sellerProducts;
    response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);
    //   }
    // }
  } catch (error) {
    console.log("Error occ while savong product" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.viewAllSellerProducts = viewAllSellerProducts;
