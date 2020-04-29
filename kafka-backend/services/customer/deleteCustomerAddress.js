const Product = require("../../models/product");
const customerDetails = require("../../models/customerDetails");
// const customerDetails = require("../../models/customerDetails");
const moment = require("moment");
var mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let deleteCustomerAddress = async (msg, callback) => {

    let response = {};
  let err = {};
  var addresses = []
  const today = moment();
  try {
   
    
    var id = mongoose.Types.ObjectId(msg._id);
    //console.log("user Id:::", msg,"id::",id);


      await customerDetails.updateOne({userId:parseInt(msg.userId)},
      { "$pull": { "customerAddresses": { "_id": id } }},{ multi:true }).then(async function(res){
            console.log("response in update",res)
            await customerDetails.findOne({userId:msg.userId}).then((res)=>{
                console.log("res", res)
                addresses = res.toObject().customerAddresses
            })
    });
    
        console.log("address results:::", addresses);
    response.data = addresses;
    response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
    //response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);
  } catch (error) {
    console.log("Error occ while fetching addresses" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
}

exports.deleteCustomerAddress = deleteCustomerAddress;