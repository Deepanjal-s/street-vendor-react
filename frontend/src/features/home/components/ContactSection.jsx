import React, { useState } from 'react';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="landing-section">
      <h2 className="landing-section-title">Contact Us</h2>
      <p className="landing-section-subtitle">Questions about partnering or ordering? Reach out.</p>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-item-icon">📧</span>
            <div>
              <h4>Email</h4>
              <p>support@hyperlocalfood.com</p>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon">📱</span>
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon">📍</span>
            <div>
              <h4>Service Area</h4>
              <p>Local neighborhoods — expanding city by city</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h4>Send a Message</h4>
          {sent && <div className="success-message">Thanks! We&apos;ll get back to you soon.</div>}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Your name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="you@email.com"
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              rows="4"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              placeholder="How can we help?"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: 0 }}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
