const express = require("express");
const router = express.Router();
const { createOrder, getOrdersByUser } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/user/:userId", getOrdersByUser);

module.exports = router;
