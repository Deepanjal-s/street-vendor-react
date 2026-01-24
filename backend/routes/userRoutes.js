const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });
  await user.save();

  // auto-create vendor profile
  if (role === "vendor") {
    const vendor = new Vendor({
      name: name,
      location: "Not set",
      isOpen: false,
    });
    await vendor.save();
  }

  res.status(201).json({ message: "User registered" });
});


// LOGIN  ✅ NEW
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secret123",   // later move to .env
    { expiresIn: "1d" }
  );

  res.json({
    token: token,
    role: user.role,
    userId: user._id,
  });
});

module.exports = router;
