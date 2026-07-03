import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CustomerSection from '../components/CustomerSection';
import VendorSection from '../components/VendorSection';
import DeliverySection from '../components/DeliverySection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import '../home.css';

const HomePage = () => {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="landing-page">
      <HeroSection />
      <CustomerSection />
      <VendorSection />
      <DeliverySection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
