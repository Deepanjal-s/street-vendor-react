const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: String,
  location: String,
  isOpen: Boolean
});

module.exports = mongoose.model("Vendor", vendorSchema);
