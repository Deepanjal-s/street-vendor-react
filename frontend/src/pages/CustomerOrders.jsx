import React, { useState, useEffect } from 'react';
import { getOrdersByUserId } from '../services/api';
import OrderCard from '../components/OrderCard';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Correct storage usage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;

    const loadOrders = async () => {
      try {
        const data = await getOrdersByUserId(userId);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    loadOrders();
  }, [userId]); // ✅ dependency added

  if (loading) {
    return <div className="loading">Loading orders...</div>;
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
