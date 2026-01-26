import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  deliveryPartnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  items: [{
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu'
    },
    itemName: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'preparing', 'ready', 'picked', 'delivered', 'cancelled'],
    default: 'pending'
  },
  customerPhone: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;