import React, { useState, useEffect } from 'react';
import { getOrdersByUserId } from '../services/api';
import OrderCard from '../components/OrderCard';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        // ✅ FIXED: Get userId from user object
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        
        if (!user || !user.id) {
          setError('Please login to view orders');
          setLoading(false);
          return;
        }

        const data = await getOrdersByUserId(user.id);
        setOrders(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    loadOrders();
  }, []); // Empty dependency - runs once on mount

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message" style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>{error}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page container">
      <h2>My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="empty-state">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <OrderCard key={order._id} order={order} showStatusUpdate={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;