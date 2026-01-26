const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: String,
  location: String,
  isOpen: Boolean
});

module.exports = mongoose.model("Vendor", vendorSchema);
