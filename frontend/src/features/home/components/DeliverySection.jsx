import React from 'react';
import { useNavigate } from 'react-router-dom';

const DUMMY_STATS = [
  { value: '₹3,200', label: 'This Week' },
  { value: '24', label: 'Deliveries' },
  { value: '₹45', label: 'Per Delivery' },
  { value: '4.8', label: 'Rating' },
];

const DeliverySection = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleCta = () => {
    if (user?.role === 'delivery') {
      navigate('/delivery-dashboard');
    } else {
      navigate('/register', { state: { selectedRole: 'delivery' } });
    }
  };

  return (
    <section className="landing-section" style={{ paddingTop: 0 }}>
      <div className="role-strip delivery">
        <div className="role-strip-header">
          <span className="role-strip-icon">🛵</span>
          <div>
            <h3>For Delivery Partners</h3>
            <p>Pick up ready orders and earn in your neighborhood</p>
          </div>
        </div>

        <span className="dummy-badge">Sample earnings — real data shows on your dashboard</span>

        <div className="stats-row">
          {DUMMY_STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="value">{stat.value}</div>
              <div className="label">{stat.label}</div>
            </div>
          ))}
        </div>

        <ul style={{ color: '#7f8c8d', marginBottom: '1.5rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
          <li>See available orders ready for pickup</li>
          <li>Update delivery status in real time</li>
          <li>Track weekly earnings and deliveries</li>
        </ul>

        <div className="role-strip-actions">
          <button className="btn-primary" style={{ width: 'auto', marginTop: 0 }} onClick={handleCta}>
            {user?.role === 'delivery' ? 'Go to Dashboard' : 'Join as Partner'}
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate('/login', { state: { selectedRole: 'delivery' } })}
          >
            Partner Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
