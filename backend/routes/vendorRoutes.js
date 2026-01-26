const express = require("express");
const router = express.Router();
const { getVendors, getVendorByUser } = require("../controllers/vendorController");

router.get("/", getVendors);

// NEW ROUTE
router.get("/user/:userId", getVendorByUser);

router.get("/", getVendors);

module.exports = router;
