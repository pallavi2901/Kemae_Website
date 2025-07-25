// server.js or index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo connection error:", err));

// Models
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  preferences: {
    aestheticType: String,
    interests: [String]
  }
}));

// USER ROUTES
app.post("/api/user/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).send("All fields required");

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send("User already exists");

  const newUser = new User({ name, email, password });
  await newUser.save();
  res.send({ success: true, message: "User signed up" });
});

app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password)
    return res.status(401).send("Invalid credentials");

  res.send({ success: true, message: "Login successful", email });
});

app.get("/api/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error retrieving user:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.post("/api/save-user", async (req, res) => {
  const { email, aestheticType, interests } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, preferences: { aestheticType, interests } });
    } else {
      user.preferences = { aestheticType, interests };
    }

    await user.save();
    res.send({ success: true, user });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Server error");
  }
});

// PRODUCT ROUTES
const productRoutes = require('./routes/productRoutes'); // ✅ Correct
app.use("/api/products", productRoutes);                 // ✅ Correct

const otpRoutes = require('./routes/otpRoutes');
app.use("/api/otp", otpRoutes);
const adminData = JSON.parse(fs.readFileSync("admin.json", "utf-8"));
console.log("📄 Admin Data:", adminData);
// Inside server.js or routes/admin.js
// ... your existing imports and setup ...

// ✅ Define a simple Order schema (adjust if needed)
const Order = mongoose.model("Order", new mongoose.Schema({
  products: [
    {
      name: String,
      quantity: Number
    }
  ],
  total: Number,
  date: { type: Date, default: Date.now }
}));

// ✅ Admin Stats Route (fixed)
app.get("/api/admin-stats", async (req, res) => {
  try {
    const users = await User.find();
    const orders = await Order.find();

    // Best Seller
    const productCount = {};
    orders.forEach(order => {
      order.products.forEach(p => {
        productCount[p.name] = (productCount[p.name] || 0) + p.quantity;
      });
    });

    const best = Object.entries(productCount).reduce(
      (a, b) => (a[1] > b[1] ? a : b),
      ["None", 0]
    );

    // Year-wise Sales
    const yearMap = {};
    orders.forEach(order => {
      const year = new Date(order.date).getFullYear();
      yearMap[year] = (yearMap[year] || 0) + order.total;
    });

    const yearlyData = Object.entries(yearMap).map(([year, sales]) => ({
      year,
      sales
    }));

    res.json({
      userCount: users.length,
      bestSeller: { name: best[0], count: best[1] },
      yearlyData
    });

  } catch (err) {
    console.error("❌ Admin stats error:", err);
    res.status(500).json({ error: "Server error fetching admin stats" });
  }
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
