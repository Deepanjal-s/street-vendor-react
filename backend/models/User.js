const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["customer", "vendor", "delivery"],
    default: "customer"
  }
});

module.exports = mongoose.model("User", userSchema);
