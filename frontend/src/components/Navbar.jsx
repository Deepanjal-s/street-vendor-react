import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/">
          <h1>🍔 HyperLocal Food</h1>
        </Link>
        
        <div className="navbar-links">
          {user ? (
            <>
              {user.role === 'customer' && (
                <>
                  <Link to="/vendors">Browse Vendors</Link>
                  <Link to="/my-orders">My Orders</Link>
                </>
              )}
              
              {user.role === 'vendor' && (
                <Link to="/vendor-dashboard">Dashboard</Link>
              )}
              
              {user.role === 'delivery' && (
                <Link to="/delivery-dashboard">Dashboard</Link>
              )}
              
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;