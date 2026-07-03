import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Otp from '../models/Otp.js';
import User from '../models/User.js';

const router = express.Router();

const normalizePhone = (phone) => String(phone || '').replace(/[^\d+]/g, '').trim();

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

// POST /api/auth/otp/request
router.post('/otp/request', async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone);
    if (!phone) return res.status(400).json({ message: 'Phone is required' });

    const code = generateOtp();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await Otp.findOneAndUpdate(
      { phone },
      { phone, codeHash, expiresAt, attempts: 0 },
      { upsert: true, new: true },
    );

    // Dev-only: return OTP so you can test without SMS provider
    const payload =
      process.env.NODE_ENV === 'production'
        ? { message: 'OTP sent' }
        : { message: 'OTP sent (dev)', devOtp: code };

    return res.json(payload);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/otp/verify
router.post('/otp/verify', async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone);
    const otp = String(req.body.otp || '').trim();
    const name = String(req.body.name || '').trim();

    if (!phone) return res.status(400).json({ message: 'Phone is required' });
    if (!otp) return res.status(400).json({ message: 'OTP is required' });

    const otpDoc = await Otp.findOne({ phone });
    if (!otpDoc) return res.status(400).json({ message: 'OTP not found. Please request again.' });
    if (otpDoc.expiresAt.getTime() < Date.now())
      return res.status(400).json({ message: 'OTP expired. Please request again.' });

    const ok = await bcrypt.compare(otp, otpDoc.codeHash);
    otpDoc.attempts += 1;
    await otpDoc.save();

    if (!ok) return res.status(400).json({ message: 'Invalid OTP' });

    await Otp.deleteOne({ phone });

    let user = await User.findOne({ phone });
    if (!user) {
      // Create a "customer" account behind the scenes (guest → verified customer)
      const guestEmail = `guest_${phone.replace(/[^\d]/g, '')}@guest.local`;
      const randomPassword = `${Math.random().toString(36).slice(2)}${Date.now()}`;

      user = await User.create({
        name: name || 'Guest Customer',
        email: guestEmail,
        password: randomPassword,
        role: 'customer',
        phone,
      });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

