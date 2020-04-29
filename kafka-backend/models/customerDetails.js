var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var address = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  street1: {
    type: String,
    trim: true,
  },
  street2: {
    type: String,
    trim: true,
  },
  name: {
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
  createDate: { type: Date },
  updateDate: { type: Date },
  phoneNo: {
    type: String,
    trim: true,
  },country: {
    type: String,
    trim: true,
  }
});

var card = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cardNo: {
      type: String,
      trim: true,
    },
    nameOnCard: {
      type: String,
      trim: true,
    },
    expirationDate: {
      type: String,
      trim: true,
    },
    cvv: {
      type: String,
      trim: true,
    },
    createDate: { type: Date },
    updateDate: { type: Date },
  });

var customerDetails = new Schema({
  userId: { type: Number, required: true },
  name: { type: String },
  customerAddresses: [address],
  customerCards: [card],
  createDate: { type: Date },
  updateDate: { type: Date },
});

// Export the model
module.exports = mongoose.model("CustomerDetails", customerDetails);
