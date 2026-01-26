import express from 'express';
import Menu from '../models/Menu.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/menus
// @desc    Create a menu item
// @access  Private (Vendor only)
router.post('/', protect, async (req, res) => {
  try {
    const { vendorId, itemName, description, price, category, isAvailable } = req.body;

    const menuItem = await Menu.create({
      vendorId,
      itemName,
      description: description || '',
      price,
      category: category || 'Other',
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/menus/:vendorId
// @desc    Get all menu items for a vendor
// @access  Public
router.get('/:vendorId', async (req, res) => {
  try {
    const menuItems = await Menu.find({ vendorId: req.params.vendorId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/menus/:id
// @desc    Update a menu item
// @access  Private (Vendor only)
router.put('/:id', protect, async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);

    if (menuItem) {
      menuItem.itemName = req.body.itemName || menuItem.itemName;
      menuItem.description = req.body.description || menuItem.description;
      menuItem.price = req.body.price || menuItem.price;
      menuItem.category = req.body.category || menuItem.category;
      menuItem.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : menuItem.isAvailable;

      const updatedMenuItem = await menuItem.save();
      res.json(updatedMenuItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/menus/:id
// @desc    Delete a menu item
// @access  Private (Vendor only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);

    if (menuItem) {
      await menuItem.deleteOne();
      res.json({ message: 'Menu item removed' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;