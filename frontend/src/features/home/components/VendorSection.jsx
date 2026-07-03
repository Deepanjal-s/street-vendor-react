import React from 'react';
import { useNavigate } from 'react-router-dom';

const DUMMY_STATS = [
  { value: '₹12,450', label: 'This Month' },
  { value: '48', label: 'Orders' },
  { value: '4.6', label: 'Avg Rating' },
  { value: '₹260', label: 'Avg Order' },
];

const VendorSection = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleCta = () => {
    if (user?.role === 'vendor') {
      navigate('/vendor-dashboard');
    } else {
      navigate('/register', { state: { selectedRole: 'vendor' } });
    }
  };

  return (
    <section className="landing-section" style={{ paddingTop: 0 }}>
      <div className="role-strip vendor">
        <div className="role-strip-header">
          <span className="role-strip-icon">👨‍🍳</span>
          <div>
            <h3>For Vendors</h3>
            <p>List your stall, manage menu, and track earnings</p>
          </div>
        </div>

        <span className="dummy-badge">Sample earnings — your real stats appear on the dashboard</span>

        <div className="stats-row">
          {DUMMY_STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="value">{stat.value}</div>
              <div className="label">{stat.label}</div>
            </div>
          ))}
        </div>

        <ul style={{ color: '#7f8c8d', marginBottom: '1.5rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
          <li>Add and update menu items anytime</li>
          <li>Accept and track incoming orders</li>
          <li>See revenue from delivered orders</li>
        </ul>

        <div className="role-strip-actions">
          <button className="btn-primary" style={{ width: 'auto', marginTop: 0 }} onClick={handleCta}>
            {user?.role === 'vendor' ? 'Go to Dashboard' : 'Register as Vendor'}
          </button>
          <button className="btn-secondary" onClick={() => navigate('/login', { state: { selectedRole: 'vendor' } })}>
            Vendor Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default VendorSection;
