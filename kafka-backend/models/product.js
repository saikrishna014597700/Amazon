var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reviewAndRating = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: String },
  review: { type: String },
  rating: { type: Number },
  createDate: { type: Date },
  updateDate: { type: Date },
});

var products = new Schema({
  productName: { type: String, required: true },
  productDesc: { type: String },
  price: { type: Number },
  sellerId: { type: String },
  isDeleted: { type: Number },
  category: { type: String },
  productImages: { type: Array },
  reviewAndRatings: [reviewAndRating],
  createDate: { type: Date },
  updateDate: { type: Date },
  avgRating:{type:Number},
  noOfRatings:{type:Number}
});

// Export the model
// module.exports = mongoose.model("Product", products);
const product = mongoose.model("Product", products);
module.exports = product;
