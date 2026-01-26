import express from 'express';
import Vendor from '../models/Vendor.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/vendors
// @desc    Get all active vendors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find({ isActive: true }).populate('userId', 'name email phone');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/vendors/:id
// @desc    Get vendor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate('userId', 'name email phone');
    
    if (vendor) {
      res.json(vendor);
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/vendors/user/:userId
// @desc    Get vendor by user ID
// @access  Private
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.params.userId });
    
    if (vendor) {
      res.json(vendor);
    } else {
      res.status(404).json({ message: 'Vendor profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/vendors/:id
// @desc    Update vendor profile
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (vendor) {
      vendor.businessName = req.body.businessName || vendor.businessName;
      vendor.description = req.body.description || vendor.description;
      vendor.cuisine = req.body.cuisine || vendor.cuisine;
      vendor.location = req.body.location || vendor.location;
      vendor.isActive = req.body.isActive !== undefined ? req.body.isActive : vendor.isActive;

      const updatedVendor = await vendor.save();
      res.json(updatedVendor);
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;