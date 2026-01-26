import React from 'react';

const OrderCard = ({ order, onStatusUpdate, showStatusUpdate }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'pending': 'accepted',
      'accepted': 'preparing',
      'preparing': 'ready',
      'ready': 'picked',
      'picked': 'delivered'
    };
    return statusFlow[currentStatus];
  };

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div>
          <h4>Order #{order._id.slice(-6)}</h4>
          <p>{formatDate(order.createdAt)}</p>
        </div>
        <span className={`order-status ${order.status}`}>
          {order.status.toUpperCase()}
        </span>
      </div>
      
      {order.vendorId && (
        <p><strong>Vendor:</strong> {order.vendorId.businessName}</p>
      )}
      
      <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
      
      <div className="order-items">
        <h5>Items:</h5>
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <span>{item.itemName} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      
      <div className="order-total">
        Total: ₹{order.totalPrice}
      </div>
      
      {showStatusUpdate && order.status !== 'delivered' && order.status !== 'cancelled' && (
        <button 
          className="btn-success" 
          onClick={() => onStatusUpdate(order._id, getNextStatus(order.status))}
          style={{ marginTop: '1rem' }}
        >
          Update to {getNextStatus(order.status)}
        </button>
      )}
    </div>
  );
};

export default OrderCard;