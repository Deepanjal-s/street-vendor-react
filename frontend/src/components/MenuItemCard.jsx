import React from 'react';

const MenuItemCard = ({ item, onAddToCart, cartQuantity }) => {
  return (
    <div className="menu-item-card">
      <h4>{item.itemName}</h4>
      <p>{item.description}</p>
      <p><strong>Category:</strong> {item.category}</p>
      <p className="menu-item-price">₹{item.price}</p>
      
      {item.isAvailable ? (
        <div className="menu-item-actions">
          {cartQuantity > 0 ? (
            <div className="quantity-controls">
              <button 
                className="quantity-btn" 
                onClick={() => onAddToCart(item, -1)}
              >
                -
              </button>
              <span className="quantity-display">{cartQuantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => onAddToCart(item, 1)}
              >
                +
              </button>
            </div>
          ) : (
            <button 
              className="btn-primary" 
              onClick={() => onAddToCart(item, 1)}
            >
              Add to Cart
            </button>
          )}
        </div>
      ) : (
        <p style={{ color: '#e74c3c' }}>Not Available</p>
      )}
    </div>
  );
};

export default MenuItemCard;