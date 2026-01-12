import { Routes, Route} from 'react-router';
//import { useState } from "react";
import Home from "./components/Home";
import VendorList from "./components/VendorList";
import VendorMenu from "./components/VendorMenu";


function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">StreetVendor</h2>
        <div className="nav-links">
          <a>Home</a>
          <a>About</a>
          <a>Contact</a>
          <a>Login</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Trusted Local Food in Minutes</h1>
        <p>Order fresh food from nearby street vendors with fast local delivery.</p>
        <button className="primary-btn">Find Nearby Vendors</button>
      </section>

      {/* ROLE CARDS */}
      <section className="roles">
        <div className="card">
          <h3>Order Food</h3>
          <p>Find trusted vendors and get food quickly.</p>
          <button>Order Now</button>
        </div>

        <div className="card">
          <h3>Become a Vendor</h3>
          <p>Sell food online and reach nearby customers.</p>
          <button>Register</button>
        </div>

        <div className="card">
          <h3>Delivery Partner</h3>
          <p>Earn by delivering orders in your area.</p>
          <button>Start Earning</button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>About</h2>
        <p>This platform connects local street vendors with customers and delivery partners for fast hyperlocal food delivery.</p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 StreetVendor Platform</p>
      </footer>

    </div>
  );
}

export default App;
