import React, { useState } from 'react';  // ✅ Fixed import
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    phone: '',
    address: '',
    businessName: '',
    description: '',
    cuisine: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');  // ✅ Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await register(formData);
      
      // ✅ FIXED: Check for token, not message
      if (!data.token) {
        setError(data.message || 'Registration failed');
        return;  // Don't setLoading(false) here - let finally handle it
      }

      // ✅ Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role
      }));

      // ✅ Redirect based on role
      switch (data.role) {
        case 'customer':
          navigate('/vendors');
          break;
        case 'vendor':
          navigate('/vendor-dashboard');
          break;
        case 'delivery':
          navigate('/delivery-dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);  // ✅ Better debugging
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);  // ✅ ALWAYS resets loading state
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Register</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Minimum 6 characters"
            />
          </div>
          
          <div className="form-group">
            <label>I am a</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="delivery">Delivery Partner</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
            />
          </div>
          
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              rows="3"
            />
          </div>
          
          {formData.role === 'vendor' && (
            <>
              <div className="form-group">
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your food stall name"
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your food offerings"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Cuisine Type</label>
                <input
                  type="text"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  placeholder="e.g., Indian,Continue10:39 AMChinese, Fast Food"
/>
</div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where is your stall located?"
            />
          </div>
        </>
      )}
      
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
    
    <p className="auth-switch">
      Already have an account? <Link to="/login">Login here</Link>
    </p>
  </div>
</div>
);
};
export default Register;