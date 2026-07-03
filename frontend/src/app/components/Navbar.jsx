import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const scrollToSection = (id) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/">
          <h1>🍔 HyperLocal Food</h1>
        </Link>

        <div className="navbar-links">
          <button type="button" className="nav-scroll-link" onClick={() => scrollToSection('home')}>
            Home
          </button>
          <button type="button" className="nav-scroll-link" onClick={() => scrollToSection('about')}>
            About
          </button>
          <button type="button" className="nav-scroll-link" onClick={() => scrollToSection('contact')}>
            Contact
          </button>

          <button type="button" className="nav-order-btn" onClick={() => navigate('/vendors')}>
            Order Now
          </button>

          {user ? (
            <>
              {user.role === 'customer' && (
                <>
                  <Link to="/vendors">Browse Vendors</Link>
                  <Link to="/my-orders">My Orders</Link>
                </>
              )}

              {user.role === 'vendor' && <Link to="/vendor-dashboard">Dashboard</Link>}

              {user.role === 'delivery' && <Link to="/delivery-dashboard">Dashboard</Link>}

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
