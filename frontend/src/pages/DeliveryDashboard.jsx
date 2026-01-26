import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../services/api';
import OrderCard from '../components/OrderCard';

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      // refresh orders after update
      const data = await getAllOrders();
      setOrders(data);

      alert('Order status updated!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  const availableOrders = orders.filter(o => o.status === 'ready');
  const myOrders = orders.filter(o => o.status === 'picked');

  return (
    <div className="dashboard container">
      <h2>Delivery Partner Dashboard</h2>
      
      <div className="dashboard-section">
        <h3>Available Orders ({availableOrders.length})</h3>
        
        {availableOrders.length === 0 ? (
          <p>No orders available for pickup.</p>
        ) : (
          <div className="orders-list">
            {availableOrders.map(order => (
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
      
      <div className="dashboard-section">
        <h3>My Deliveries ({myOrders.length})</h3>
        
        {myOrders.length === 0 ? (
          <p>No active deliveries.</p>
        ) : (
          <div className="orders-list">
            {myOrders.map(order => (
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

export default DeliveryDashboard;
