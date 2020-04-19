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
    type: Number,
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
    type: Number,
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
    type: Number,
    trim: true,
  },
});

var product = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: { type: String },
  quantity: { type: Number },
});

var giftObj = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  isGift: { type: Boolean },
  giftMessage: { type: String },
});

var trackingDetails = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  trackingStatus: { type: String },
  trackingAddress: [trackingAddress],
  createDate: { type: Date },
});

var order = new Schema({
  userId: { type: Number, required: true },
  billingAddress: [billingaddress],
  shippingAddress: [shippingaddress],
  transactionAmount: { type: Number },
  status: { type: String },
  products: [product],
  gift: [giftObj],
  paymentDetails: { type: String }, // card id from customer details
  trackingInfo: [trackingDetails],
  createDate: { type: Date },
  updateDate: { type: Date },
});

// Export the model
module.exports = mongoose.model("Order", order);
