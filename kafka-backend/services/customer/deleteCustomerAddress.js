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
    console.log("user Idd:::",msg);


    //   await customerDetails.updateOne({userId:parseInt(msg.userId)},
    //   { $pull: { customerAddresses: { _id: msg._id } }},{ multi:true }).then(async function(res){
    //         console.log("response in update",res)
    //         await customerDetails.findOne({userId:msg.userId}).then((res)=>{
    //             console.log("res", res)
    //             addresses = res.toObject().customerAddresses
    //         })
    // });
    await customerDetails.findOne({userId: parseInt(msg.userId)},async  function(err,result){
      if (err) {
          console.log(err);            
      }else{
        console.log("00000Resukt",result)
          result.customerAddresses.pull(msg._id)
          console.log("after",result)
         await result.save().then(async (err,result)=>{
          await customerDetails.findOne({userId: msg.userId}).then((res)=>{
            console.log("res", res)
            addresses = res.toObject().customerAddresses
        });
         })
        
        
      }
  })


    
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