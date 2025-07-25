const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  preferences: {
    aestheticType: String,
    interests: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
