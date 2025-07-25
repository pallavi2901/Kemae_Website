// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: String,
  category: String,
  description: String
});

module.exports = mongoose.model("Product", ProductSchema);
