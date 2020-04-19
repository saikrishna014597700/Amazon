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

var seller = new Schema({
  userId: { type: Number, required: true },
  sellerName: { type: String, required: true },
  sellerAddress: [address],
  sellerProfilePic: { type: String },
  createDate: { type: Date },
  updateDate: { type: Date },
});

// Export the model
module.exports = mongoose.model("Seller", seller);
