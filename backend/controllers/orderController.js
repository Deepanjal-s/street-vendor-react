const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { userId, vendorId, items, totalPrice } = req.body;

    const order = new Order({
      userId,
      vendorId,
      items,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
};

exports.getOrdersByUser = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
};
