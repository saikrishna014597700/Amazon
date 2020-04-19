var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var address = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  street: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  zip_code: {
    type: Number,
    trim: true,
  },
  createDate: { type: Date },
  updateDate: { type: Date },
});

var cards = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customerCardName: { type: String, required: true },
  customerCardNumber: { type: Number, required: true },
  customerCardCVV: { type: Number },
  customerCardExpDate: { type: Date },
  createDate: { type: Date },
  updateDate: { type: Date },
});

var customer = new Schema({
  userId: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerAddress: [address],
  customerCards: [cards],
  sellerProfilePic: { type: String },
  createDate: { type: Date },
  updateDate: { type: Date },
});

// Export the model
module.exports = mongoose.model("Customer", customer);
