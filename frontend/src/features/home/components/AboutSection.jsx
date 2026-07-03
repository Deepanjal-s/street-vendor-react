import React from 'react';

const ABOUT_ITEMS = [
  {
    icon: '🏘️',
    title: 'Hyperlocal Focus',
    text: 'We connect you with street vendors in your area — supporting small businesses and local flavors.',
  },
  {
    icon: '🚀',
    title: 'Built for Speed',
    text: 'Short delivery radius means faster food and happier customers. Order to doorstep in minutes.',
  },
  {
    icon: '🔒',
    title: 'Simple & Secure',
    text: 'Verify with OTP at checkout. Vendors and delivery partners use secure dashboards.',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="landing-section about-section">
      <h2 className="landing-section-title">About HyperLocal Food</h2>
      <p className="landing-section-subtitle">
        A MERN platform connecting customers, street vendors, and delivery partners
      </p>

      <div className="about-grid">
        {ABOUT_ITEMS.map((item) => (
          <div key={item.title} className="about-card">
            <div className="about-card-icon">{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', marginTop: '2.5rem', color: '#7f8c8d', maxWidth: 700, marginInline: 'auto', lineHeight: 1.7 }}>
        HyperLocal Food is designed for internship-ready demos: role-based auth, order lifecycle,
        vendor menus, delivery tracking, and guest checkout with phone verification.
      </p>
    </section>
  );
};

export default AboutSection;
