const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Save new user (signup)
router.post('/signup', async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email });
    await user.save();
    return res.json({ success: true, newUser: true });
  }

  res.json({ success: true, newUser: false });
});

// Get user by email
router.get('/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.json(user);
});

module.exports = router;
