var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var billingaddress = new Schema({
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
    type: String,
    trim: true,
  },
});

var shippingaddress = new Schema({
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
    type: String,
    trim: true,
  },
});

var trackingAddress = new Schema({
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
    type: String,
    trim: true,
  },
});

var trackingDetails = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  trackingStatus: { type: String },
  trackingAddress: { type: trackingAddress },
  createDate: { type: Date },
});



var giftObj = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  isGift: { type: Boolean },
  giftMessage: { type: String },
});

var product = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: { type: String },
  quantity: { type: Number },
  trackingInfo: [trackingDetails],
  status: { type: String },
  gift : { type: giftObj }
});

var order = new Schema({
  userId: { type: Number, required: true },
  billingAddress: { type: billingaddress },
  shippingAddress: { type: shippingaddress },
  transactionAmount: { type: Number },
  products: [product],
  // gift: { type: giftObj },
  paymentDetails: { type: String }, // card id from customer details
  createDate: { type: Date },
  updateDate: { type: Date },
});

// Export the model
module.exports = mongoose.model("Order", order);
