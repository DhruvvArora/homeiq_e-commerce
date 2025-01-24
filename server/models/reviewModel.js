const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productModelName: String,
  productCategory: String,
  productPrice: Number,
  storeID: String,
  storeZip: String,
  storeCity: String,
  storeState: String,
  productOnSale: Boolean,
  manufacturerName: String,
  manufacturerRebate: Boolean,
  userID: String,
  userAge: Number,
  userGender: String,
  userOccupation: String,
  reviewRating: Number,
  reviewDate: { type: Date, default: Date.now },
  reviewText: String,
});

module.exports = mongoose.model('Review', reviewSchema);
