const Product = require("../../models/product");
const customerDetails = require("../../models/customerDetails");
// const customerDetails = require("../../models/customerDetails");
const moment = require("moment");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let deleteCustomerCard = async (msg, callback) => {

    let response = {};
  let err = {};
  var cards = []
  const today = moment();
  try {
   
    
    var id = mongoose.Types.ObjectId(msg._id);
    //console.log("user Id:::", msg,"id::",id);


      await customerDetails.updateOne({userId:parseInt(msg.userId)},
      { "$pull": { "customerCards": { "_id": id } }},{ multi:true }).then(async function(res){
            console.log("response in update",res)
            await customerDetails.findOne({userId:msg.userId}).then((res)=>{
                console.log("res", res)
                cards = res.toObject().customerCards
            })
    });
    
        console.log("card results:::", cards);
    response.data = cards;
    response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    //response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);
  } catch (error) {
    console.log("Error occ while fetching cards" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
}

exports.deleteCustomerCard = deleteCustomerCard;