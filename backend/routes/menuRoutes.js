const express = require("express");
const router = express.Router();
const {
  addMenuItem,
  getMenuByVendor
} = require("../controllers/menuController");

router.post("/", addMenuItem);
router.get("/:vendorId", getMenuByVendor);

module.exports = router;
