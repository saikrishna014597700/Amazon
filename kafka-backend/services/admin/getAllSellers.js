"use strict";
const Seller = require("../../models/seller");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
let getAllSellers = async (msg, callback) => {
  let response = {};
  let err = {};
  console.log("MSG>SEARCH TERM BEFORE:::", msg.searchTerm);
  if (!msg.searchTerm) {
    msg.searchTerm = "";
  }
  try {
    console.log("msg.searchTerm:::", msg.searchTerm);
    await Seller.find({ sellerName: { $regex: msg.searchTerm, $options: "i" } }).then(async (res) => {

      var sellersFinal = [];
      for (var seller of res) {
        var sellerObj = await seller.toObject();
        sellerObj = await modifyData(sellerObj).then(
          sellersFinal.push(sellerObj)
        );
      }
      sleep(1000).then(() => {
        console.log("Sellers found:::::", sellersFinal);
        response.result = sellersFinal;
        response.status = STATUS_CODE.SUCCESS;
        response.data = MESSAGES.SUCCESS;
        return callback(null, response);
      });

    })
      .catch((err) => {
        console.log("Error1 ", err);
        return callback(err, null);
      });
  } catch (error) {
    onsole.log("Error2 ", error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getAllSellers = getAllSellers;


async function modifyData(sellerObj) {

  await pool.query(`select imagePath from users where id = ${sellerObj.userId}`, async (err, sqlResult) => {
    if (!err) {
      console.log("sqlResult for imagePaths", await sqlResult[0].imagePath)
      if (await sqlResult[0].imagePath) {
        sellerObj.imagePath = await sqlResult[0].imagePath
        console.log("sellerObj:::", sellerObj)
        return sellerObj;
      }
    }
  })



}