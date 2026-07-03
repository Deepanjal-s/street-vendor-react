import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createOrder,
  getMenuByVendorId,
  getVendorById,
  requestCheckoutOtp,
  verifyCheckoutOtp,
} from '../../../services/api';
import MenuItemCard from '../ui/MenuItemCard';

const VendorMenuPage = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [checkoutStep, setCheckoutStep] = useState('details'); // details | otp
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [devOtp, setDevOtp] = useState('');

  useEffect(() => {
    const loadVendorAndMenu = async () => {
      try {
        const vendorData = await getVendorById(vendorId);
        const menuData = await getMenuByVendorId(vendorId);

        setVendor(vendorData);
        setMenuItems(menuData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVendorAndMenu();
  }, [vendorId]);

  const handleAddToCart = (item, quantityChange) => {
    const existingItem = cart.find((cartItem) => cartItem.menuItemId === item._id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantityChange;

      if (newQuantity <= 0) {
        setCart(cart.filter((cartItem) => cartItem.menuItemId !== item._id));
      } else {
        setCart(
          cart.map((cartItem) =>
            cartItem.menuItemId === item._id ? { ...cartItem, quantity: newQuantity } : cartItem,
          ),
        );
      }
    } else if (quantityChange > 0) {
      setCart([
        ...cart,
        {
          menuItemId: item._id,
          itemName: item.itemName,
          price: item.price,
          quantity: quantityChange,
        },
      ]);
    }
  };

  const getCartQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.menuItemId === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const calculateTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const placeOrderAuthed = async () => {
    const orderData = {
      vendorId,
      items: cart,
      totalPrice: calculateTotal(),
      deliveryAddress,
      customerPhone,
    };

    await createOrder(orderData);
    alert('Order placed successfully!');
    navigate('/my-orders');
  };

  const handleRequestOtp = async () => {
    if (!customerPhone.trim()) {
      alert('Please enter your phone number');
      return;
    }

    try {
      setOtpLoading(true);
      setDevOtp('');
      const res = await requestCheckoutOtp({ phone: customerPhone });
      if (res?.devOtp) setDevOtp(String(res.devOtp));
      setCheckoutStep('otp');
    } catch (error) {
      console.error('Error requesting OTP:', error);
      alert(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtpAndPlaceOrder = async () => {
    if (!otp.trim()) {
      alert('Please enter OTP');
      return;
    }

    try {
      setOtpLoading(true);
      const data = await verifyCheckoutOtp({ phone: customerPhone, otp, name: customerName });

      const user = {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', data.token);

      await placeOrderAuthed();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert(error.message || 'OTP verification failed');
    } finally {
      setOtpLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Please add items to cart');
      return;
    }

    if (!deliveryAddress.trim()) {
      alert('Please enter delivery address');
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      try {
        await placeOrderAuthed();
      } catch (error) {
        console.error('Error placing order:', error);
        alert(error.message || 'Failed to place order. Please try again.');
      }
      return;
    }

    await handleRequestOtp();
  };

  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  return (
    <div className="menu-page container">
      {vendor && (
        <div className="menu-header">
          <h2>{vendor.businessName}</h2>
          <p>{vendor.description}</p>
          <p>
            <strong>Cuisine:</strong> {vendor.cuisine}
          </p>
          <p>
            <strong>Location:</strong> {vendor.location}
          </p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <h3>Menu Items</h3>
          {menuItems.length === 0 ? (
            <div className="empty-state">
              <p>No menu items available.</p>
            </div>
          ) : (
            <div className="menu-items">
              {menuItems.map((item) => (
                <MenuItemCard
                  key={item._id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  cartQuantity={getCartQuantity(item._id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="cart-section">
          <h3>Your Cart</h3>

          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div>
                      <div>{item.itemName}</div>
                      <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                        ₹{item.price} x {item.quantity}
                      </div>
                    </div>
                    <div>₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="cart-total">Total: ₹{calculateTotal()}</div>

              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter delivery address"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>Name (optional)</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label>Contact Phone</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Your phone number"
                />
              </div>

              {checkoutStep === 'otp' ? (
                <>
                  <div className="form-group">
                    <label>Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit OTP"
                      inputMode="numeric"
                    />
                    {devOtp && (
                      <p style={{ marginTop: '0.5rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
                        Dev OTP: <strong>{devOtp}</strong>
                      </p>
                    )}
                  </div>

                  <button
                    className="btn-success"
                    onClick={handleVerifyOtpAndPlaceOrder}
                    style={{ width: '100%', marginBottom: '0.5rem' }}
                    disabled={otpLoading}
                  >
                    {otpLoading ? 'Verifying...' : 'Verify & Place Order'}
                  </button>

                  <button
                    className="btn-primary"
                    onClick={() => {
                      setCheckoutStep('details');
                      setOtp('');
                      setDevOtp('');
                    }}
                    style={{ width: '100%' }}
                    disabled={otpLoading}
                  >
                    Edit details
                  </button>
                </>
              ) : (
                <button
                  className="btn-success"
                  onClick={handlePlaceOrder}
                  style={{ width: '100%' }}
                  disabled={otpLoading}
                >
                  {otpLoading ? 'Sending OTP...' : 'Place Order'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorMenuPage;

