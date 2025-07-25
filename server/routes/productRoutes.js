const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json(product);
});

// POST new product
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json({ success: true, product: newProduct });
});

// ✅ DELETE product by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
