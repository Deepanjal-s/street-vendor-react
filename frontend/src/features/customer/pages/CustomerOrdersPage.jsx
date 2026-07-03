import React, { useEffect, useState } from 'react';
import { getOrdersByUserId } from '../../../services/api';
import OrderCard from '../../shared/ui/OrderCard';

const CustomerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (!user || !user.id) {
          setError('Please login to view orders');
          return;
        }

        const data = await getOrdersByUserId(user.id);
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

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
          <p>You haven&apos;t placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} showStatusUpdate={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrdersPage;

