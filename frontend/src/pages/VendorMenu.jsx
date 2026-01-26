import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVendorById, getMenuByVendorId, createOrder } from '../services/api';
import MenuItemCard from '../components/MenuItemCard';

const VendorMenu = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  
  const [vendor, setVendor] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
// changed 
useEffect(() => {
  const loadVendorAndMenu = async () => {
    try {
      const vendorData = await getVendorById(vendorId);
      const menuData = await getMenuByVendorId(vendorId);
      
      setVendor(vendorData);
      setMenuItems(menuData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  loadVendorAndMenu();
}, [vendorId]);

  const handleAddToCart = (item, quantityChange) => {
    const existingItem = cart.find(cartItem => cartItem.menuItemId === item._id);
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantityChange;
      
      if (newQuantity <= 0) {
        setCart(cart.filter(cartItem => cartItem.menuItemId !== item._id));
      } else {
        setCart(cart.map(cartItem =>
          cartItem.menuItemId === item._id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        ));
      }
    } else if (quantityChange > 0) {
      setCart([...cart, {
        menuItemId: item._id,
        itemName: item.itemName,
        price: item.price,
        quantity: quantityChange
      }]);
    }
  };

  const getCartQuantity = (itemId) => {
    const cartItem = cart.find(item => item.menuItemId === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
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

    try {
      const orderData = {
        vendorId,
        items: cart,
        totalPrice: calculateTotal(),
        deliveryAddress,
        customerPhone
      };

      await createOrder(orderData);
      alert('Order placed successfully!');
      navigate('/my-orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
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
          <p><strong>Cuisine:</strong> {vendor.cuisine}</p>
          <p><strong>Location:</strong> {vendor.location}</p>
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
              {menuItems.map(item => (
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
              
              <div className="cart-total">
                Total: ₹{calculateTotal()}
              </div>
              
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
                <label>Contact Phone</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Your phone number"
                />
              </div>
              
              <button 
                className="btn-success" 
                onClick={handlePlaceOrder}
                style={{ width: '100%' }}
              >
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorMenu;
