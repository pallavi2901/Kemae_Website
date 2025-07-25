const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  userEmail: String,
  message: String,
  rating: Number, // 1 to 5 stars
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
