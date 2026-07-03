import React, { useEffect, useState } from 'react';
import {
  createMenuItem,
  getAllOrders,
  getMenuByVendorId,
  getVendorByUserId,
  updateOrderStatus,
} from '../../../services/api';
import OrderCard from '../../shared/ui/OrderCard';

const VendorDashboardPage = () => {
  const [vendor, setVendor] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [newItem, setNewItem] = useState({
    itemName: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true,
  });

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        setError('');

        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (!user?.id) {
          setError('Please login again');
          return;
        }

        const vendorData = await getVendorByUserId(user.id);
        setVendor(vendorData);

        const menuData = await getMenuByVendorId(vendorData._id);
        setMenuItems(menuData || []);

        const ordersData = await getAllOrders();
        setOrders(ordersData || []);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
        setError('Failed to load dashboard. Please refresh.');
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  const handleAddMenuItem = async (e) => {
    e.preventDefault();

    if (!vendor?._id) {
      alert('Vendor profile not loaded');
      return;
    }

    try {
      const menuData = {
        ...newItem,
        vendorId: vendor._id,
        price: parseFloat(newItem.price),
      };

      await createMenuItem(menuData);

      setNewItem({
        itemName: '',
        description: '',
        price: '',
        category: '',
        isAvailable: true,
      });
      setShowAddForm(false);

      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const vendorData = await getVendorByUserId(user.id);
      const refreshedMenu = await getMenuByVendorId(vendorData._id);
      setMenuItems(refreshedMenu || []);

      alert('Menu item added successfully!');
    } catch (error) {
      console.error('Error adding menu item:', error);
      alert('Failed to add menu item');
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      const ordersData = await getAllOrders();
      setOrders(ordersData || []);
      alert('Order status updated!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message" style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>{error}</h3>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="empty-state container">
        <h3>Vendor profile not found</h3>
        <p>Please complete your vendor registration</p>
      </div>
    );
  }

  return (
    <div className="dashboard container">
      <h2>{vendor.businessName} Dashboard</h2>

      <div className="dashboard-section">
        <h3>Business Information</h3>
        <p>
          <strong>Name:</strong> {vendor.businessName}
        </p>
        <p>
          <strong>Cuisine:</strong> {vendor.cuisine}
        </p>
        <p>
          <strong>Location:</strong> {vendor.location}
        </p>
        <p>
          <strong>Description:</strong> {vendor.description || 'No description'}
        </p>
      </div>

      <div className="dashboard-section">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h3>Menu Items ({menuItems.length})</h3>
          <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add New Item'}
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddMenuItem}
            style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '2px dashed #3498db',
            }}
          >
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Item Name *</label>
              <input
                type="text"
                value={newItem.itemName}
                onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                required
                placeholder="e.g., Chicken Biryani"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                rows="3"
                placeholder="Describe your item..."
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px' }}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  required
                  placeholder="50"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  placeholder="Main Course, Snack, etc."
                />
              </div>
            </div>

            <button type="submit" className="btn-success" style={{ width: '100%' }}>
              Add Menu Item
            </button>
          </form>
        )}

        {menuItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
            <p>No menu items yet.</p>
          </div>
        ) : (
          <div className="menu-items-list">
            {menuItems.map((item) => (
              <div
                key={item._id}
                className="menu-item-row"
                style={{
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4>{item.itemName}</h4>
                  <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>{item.description}</p>
                  <p>
                    <strong>₹{item.price}</strong> | <span>{item.category}</span>
                  </p>
                </div>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: item.isAvailable ? '#27ae60' : '#e74c3c',
                    background: item.isAvailable ? '#d4edda' : '#fadbd8',
                  }}
                >
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h3>Orders ({orders.length})</h3>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
            <p>No orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                showStatusUpdate={true}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboardPage;

