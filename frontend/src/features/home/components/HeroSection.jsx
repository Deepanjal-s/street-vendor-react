import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    icon: '🍛',
    title: 'Fresh from the Street',
    text: 'Order authentic local food from vendors in your neighborhood — hot, fresh, and affordable.',
  },
  {
    icon: '⚡',
    title: 'Fast Local Delivery',
    text: 'Our delivery partners bring your order to your door in minutes, not hours.',
  },
  {
    icon: '💰',
    title: 'Support Local Vendors',
    text: 'Every order helps small street food businesses grow in your community.',
  },
  {
    icon: '📱',
    title: 'No Account Needed',
    text: 'Browse, order, and verify with OTP at checkout — simple and quick.',
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <h1>HyperLocal Food — Street Flavors, Delivered Fast</h1>
          <p>
            Discover nearby street vendors, order your favorites, and get them delivered by local
            partners. No hassle — just great food from your neighborhood.
          </p>
          <div className="hero-cta">
            <button className="hero-btn-primary" onClick={() => navigate('/vendors')}>
              Order Now
            </button>
            <button className="hero-btn-secondary" onClick={() => scrollTo('about')}>
              Learn More
            </button>
          </div>
        </div>

        <div>
          <div className="hero-carousel">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.title}
                className={`carousel-card ${index === activeIndex ? 'active' : 'inactive'}`}
              >
                <div className="carousel-icon">{slide.icon}</div>
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </div>
            ))}
          </div>
          <div className="carousel-dots">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
