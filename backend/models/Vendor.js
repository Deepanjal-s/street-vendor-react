import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  cuisine: {
    type: String,
    default: 'Multi-cuisine'
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;