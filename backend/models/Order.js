const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  items: [
    {
      itemName: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
