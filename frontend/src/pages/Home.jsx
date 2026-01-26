import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleRoleSelect = (role) => {
    if (user) {
      // User is logged in, redirect based on their role
      if (user.role === 'customer') navigate('/vendors');
      else if (user.role === 'vendor') navigate('/vendor-dashboard');
      else if (user.role === 'delivery') navigate('/delivery-dashboard');
    } else {
      // User not logged in, go to login
      navigate('/login', { state: { selectedRole: role } });
    }
  };

  return (
    <div className="home-page">
      <div className="home-hero">
        <h2>Welcome to HyperLocal Food</h2>
        <p>Connecting you with local street vendors and delivery partners</p>
      </div>
      
      <div className="role-cards">
        <div className="role-card">
          <div className="role-card-icon">🍕</div>
          <h3>Order Food</h3>
          <p>Discover and order from local street vendors near you</p>
          <button 
            className="role-card-btn" 
            onClick={() => handleRoleSelect('customer')}
          >
            Browse Vendors
          </button>
        </div>
        
        <div className="role-card">
          <div className="role-card-icon">👨‍🍳</div>
          <h3>I'm a Vendor</h3>
          <p>Register your food stall and start receiving orders</p>
          <button 
            className="role-card-btn" 
            onClick={() => handleRoleSelect('vendor')}
          >
            Vendor Portal
          </button>
        </div>
        
        <div className="role-card">
          <div className="role-card-icon">🛵</div>
          <h3>Deliver Orders</h3>
          <p>Earn by delivering food in your neighborhood</p>
          <button 
            className="role-card-btn" 
            onClick={() => handleRoleSelect('delivery')}
          >
            Delivery Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;