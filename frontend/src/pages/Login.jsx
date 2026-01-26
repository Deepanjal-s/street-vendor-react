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

    try {
      const data = await login(formData);

      if (data.message) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // ✅ Save correct backend response
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      // changed
      localStorage.setItem('userId', data._id);
      //localStorage.setItem('userId', data.userId);

      // Redirect based on role
      if (data.role === 'customer') {
        navigate('/vendors');
      } else if (data.role === 'vendor') {
        navigate('/vendor-dashboard');
      } else if (data.role === 'delivery') {
        navigate('/delivery-dashboard');
      }

    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>

        {selectedRole && (
          <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#7f8c8d' }}>
            Login as {selectedRole}
          </p>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
