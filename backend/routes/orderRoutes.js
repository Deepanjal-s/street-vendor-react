import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { vendorId, items, totalPrice, deliveryAddress, customerPhone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = await Order.create({
      userId: req.user._id,
      vendorId,
      items,
      totalPrice,
      deliveryAddress,
      customerPhone: customerPhone || req.user.phone || '',
      status: 'pending'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/user/:userId
// @desc    Get orders by user ID
// @access  Private
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('vendorId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (for delivery partners or vendors)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let orders;

    // If vendor, get orders for their vendor
    if (req.user.role === 'vendor') {
      const Vendor = (await import('../models/Vendor.js')).default;
      const vendor = await Vendor.findOne({ userId: req.user._id });
      
      if (vendor) {
        orders = await Order.find({ vendorId: vendor._id })
          .populate('userId', 'name phone address')
          .populate('vendorId')
          .sort({ createdAt: -1 });
      } else {
        orders = [];
      }
    } 
    // If delivery partner, get all pending/ready orders
    else if (req.user.role === 'delivery') {
      orders = await Order.find({ 
        status: { $in: ['ready', 'picked'] }
      })
        .populate('userId', 'name phone address')
        .populate('vendorId')
        .sort({ createdAt: -1 });
    } 
    // If customer, get their orders
    else {
      orders = await Order.find({ userId: req.user._id })
        .populate('vendorId')
        .sort({ createdAt: -1 });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name phone address')
      .populate('vendorId')
      .populate('deliveryPartnerId', 'name phone');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      
      // If delivery partner accepts order
      if (req.body.status === 'picked' && req.user.role === 'delivery') {
        order.deliveryPartnerId = req.user._id;
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;