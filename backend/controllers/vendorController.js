const Vendor = require("../models/Vendor");

exports.getVendors = async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
};

exports.createVendor = async (req, res) => {
  const vendor = new Vendor(req.body);
  await vendor.save();
  res.status(201).json(vendor);
};

exports.getVendorByUser = async (req, res) => {
  const vendor = await Vendor.findOne({ userId: req.params.userId });
  res.json(vendor);
};
