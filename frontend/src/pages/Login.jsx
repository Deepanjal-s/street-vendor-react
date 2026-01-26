import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRole = location.state?.selectedRole;

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔍 Attempting login with:', formData.email);

    try {
      const data = await login(formData);
      
      console.log('✅ Login response:', data);

      // ✅ FIXED: Save as user object (matching App.jsx ProtectedRoute)
      const user = {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', data.token);

      console.log('💾 Saved user to localStorage:', user);

      // Redirect based on role
      console.log('🚀 Navigating to dashboard for role:', data.role);
      
      if (data.role === 'customer') {
        navigate('/vendors');
      } else if (data.role === 'vendor') {
        navigate('/vendor-dashboard');
      } else if (data.role === 'delivery') {
        navigate('/delivery-dashboard');
      }

    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-container" style={{ maxWidth: '400px', width: '100%', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>

        {selectedRole && (
          <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#7f8c8d' }}>
            Login as {selectedRole}
          </p>
        )}

        {error && (
          <div className="error-message" style={{ padding: '10px', marginBottom: '1rem', background: '#fee', color: '#c33', borderRadius: '4px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', background: loading ? '#95a5a6' : '#3498db', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          Don't have an account? <Link to="/register" style={{ color: '#3498db', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;