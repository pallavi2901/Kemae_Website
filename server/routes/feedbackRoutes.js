const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST feedback
router.post('/', async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.json({ success: true });
});

// GET feedbacks for a product
router.get('/:productId', async (req, res) => {
  const feedbacks = await Feedback.find({ productId: req.params.productId });
  res.json(feedbacks);
});

module.exports = router;
