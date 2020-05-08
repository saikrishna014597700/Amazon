const Product = require("../../models/product");
const customerDetails = require("../../models/customerDetails");
// const customerDetails = require("../../models/customerDetails");
const moment = require("moment");
var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;

const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let saveCustomerCards = async (msg, callback) => {

    let response = {};
  let err = {};
  var cards = []
  const today = moment();
  console.log("msg._id:::",msg._id)
  if(msg._id === "-1"){
    console.log("new card");
    msg._id = undefined
  }

  console.log("msg._id:::",msg._id)
  try {
   
    if(msg._id){
    var id = mongoose.Types.ObjectId(msg._id);
    console.log("user Id:::", msg,"id::",id);

    var cardId = mongoose.Types.ObjectId(msg._id);

      await customerDetails.updateOne({userId:parseInt(msg.userId),  customerCards: { $elemMatch: { _id: cardId} }},
        {$set:{"customerCards.$.cardNo": msg.cardNo ,"customerCards.$.nameOnCard": msg.nameOnCard,"customerCards.$.expirationDate": msg.expirationDate,"customerCards.$.cvv": msg.cvv }}).then(async function(res){
            console.log("response in update",res)
            await customerDetails.findOne({userId:msg.userId}).then((res)=>{
                console.log("res", res)
                cards = res.toObject().customerCards
            })
    });
    }
    else{

        console.log("save card::,",msg.cardNo)
        var card = {
            _id:new ObjectId(),
            cardNo: msg.cardNo,
            nameOnCard:msg.nameOnCard,
            expirationDate:msg.expirationDate,
            cvv:msg.cvv,
            createDate: moment(),
            updateDate:moment()
        }
       await customerDetails.updateOne({userId:parseInt(msg.userId)},
       {$push:{customerCards:card}}
       ).then(async function(res){

        await customerDetails.findOne({userId:msg.userId}).then((res)=>{
            console.log("res", res)
            cards = res.toObject().customerCards
        })
    })

    }
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

exports.saveCustomerCards = saveCustomerCards;