
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  fileType: { type: String },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Listing', listingSchema);
