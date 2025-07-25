const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');

// In-memory OTP storage
const otpStore = new Map();

// Email transporter setup (use Gmail App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OTP_EMAIL,
    pass: process.env.OTP_PASS,
  },
});

// ✅ Route to send OTP
router.post('/send', async (req, res) => {
  const { adminId, email } = req.body;

  console.log("📥 OTP send request received:", { adminId, email });

  // Read admin.json
  const adminData = JSON.parse(fs.readFileSync('admin.json', 'utf-8'));

  const matchedAdmin = adminData.find(
    admin =>
      admin.adminId.toLowerCase() === adminId.toLowerCase() &&
      admin.email.toLowerCase() === email.toLowerCase()
  );

  if (!matchedAdmin) {
    console.log("❌ Admin not found in admin.json");
    return res.status(400).json({ message: "Admin not found" });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(adminId, { otp, expires: Date.now() + 5 * 60 * 1000 });

  try {
    await transporter.sendMail({
      from: process.env.OTP_EMAIL,
      to: email,
      subject: "Your Admin OTP - KEMAÉ",
      html: `<h3>Admin Verification OTP</h3><p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });

    console.log("✅ OTP sent to:", email);
    res.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ✅ Route to verify OTP and password
router.post('/verify', (req, res) => {
  const { adminId, otp, password } = req.body;

  console.log("📥 OTP verify request:", { adminId, otp });

  // Read admin.json
  const adminData = JSON.parse(fs.readFileSync('admin.json', 'utf-8'));

  const matchedAdmin = adminData.find(
    admin =>
      admin.adminId.toLowerCase() === adminId.toLowerCase() &&
      admin.password === password
  );

  if (!matchedAdmin) {
    console.log("❌ Invalid credentials");
    return res.status(400).json({ message: "Invalid admin ID or password" });
  }

  const record = otpStore.get(adminId);
  if (!record) return res.status(400).json({ message: "OTP not found" });
  if (Date.now() > record.expires) return res.status(403).json({ message: "OTP expired" });
  if (record.otp !== otp) return res.status(401).json({ message: "Invalid OTP" });

  otpStore.delete(adminId);
  console.log("✅ Admin verified");
  res.json({ success: true, message: "Admin verified" });
});

module.exports = router;
