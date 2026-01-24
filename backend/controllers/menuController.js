const Menu = require("../models/Menu");

// Add menu item
exports.addMenuItem = async (req, res) => {
  const { vendorId, itemName, price } = req.body;

  const menuItem = new Menu({
    vendorId,
    itemName,
    price
  });

  await menuItem.save();
  res.status(201).json(menuItem);
};

// Get menu by vendor
exports.getMenuByVendor = async (req, res) => {
  const vendorId = req.params.vendorId;

  const menuItems = await Menu.find({ vendorId });
  res.json(menuItems);
};
