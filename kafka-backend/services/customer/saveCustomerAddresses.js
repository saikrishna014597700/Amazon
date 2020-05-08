const Product = require("../../models/product");
const customerDetails = require("../../models/customerDetails");
// const customerDetails = require("../../models/customerDetails");
const moment = require("moment");
var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;

const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let saveCustomerAddresses = async (msg, callback) => {

    let response = {};
  let err = {};
  var addresses = []
  const today = moment();
  if(msg._id === "-1"){
    console.log("new card");
    msg._id = undefined
  }
  try {
   
    if(msg._id){
    var id = mongoose.Types.ObjectId(msg._id);
    console.log("user Id:::", msg,"id::",id);

      var cardId = mongoose.Types.ObjectId(msg._id);
      await customerDetails.updateOne({userId:parseInt(msg.userId),  customerAddresses: { $elemMatch: { _id: cardId} }},
        {$set:{"customerAddresses.$.street1": msg.street1 ,"customerAddresses.$.city": msg.city,"customerAddresses.$.state": msg.state,"customerAddresses.$.zip_code": msg.zip_code ,"customerAddresses.$.street2": msg.street2,"customerAddresses.$.country": msg.country,"customerAddresses.$.name": msg.name,"customerAddresses.$.phoneNo": msg.phoneNo }}).then(async function(res){
            //console.log("response in update",res)
            await customerDetails.findOne({userId:msg.userId}).then((res)=>{
                console.log("res", res)
                addresses = res.toObject().customerAddresses
            })
    });
    }
    else{

        console.log("save addresses::,",msg.street)
        var address = {
            _id:new ObjectId(),
            street1: msg.street1,
            city:msg.city,
            state:msg.state,
            zip_code:msg.zip_code,
            name:msg.name,
            phoneNo:msg.phoneNo,
            street2:msg.street2,
            country:msg.country,
            createDate: moment(),
            updateDate:moment()
        }
       await customerDetails.updateOne({userId:parseInt(msg.userId)},
       {$push:{customerAddresses:address}}
       ).then(async function(res){

        await customerDetails.findOne({userId:msg.userId}).then((res)=>{
            console.log("res", res)
            addresses = res.toObject().customerAddresses
        })
    })

    }
    console.log("addresses results:::", addresses);
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

exports.saveCustomerAddresses = saveCustomerAddresses;