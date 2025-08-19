import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css"; 

export default function LandingPage() {
  return (
    <div className="landing-container">
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to BizNest</h1>
          <p>Your one-stop digital platform for local stores, smart billing, and seamless payments.</p>
          <div className="cta-buttons">
            {/* Two separate buttons for Customer and Shopkeeper */}
            <Link to="/login?role=customer" className="btn-primary">
              I’m a Customer
            </Link>
            <Link to="/login?role=shopkeeper" className="btn-secondary">
              I’m a Shopkeeper
            </Link>
            <Link to="/services" className="btn-tertiary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1556742400-b5d3f0ddf0c6" 
            alt="Local Business" 
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose BizNest?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <img src="https://img.icons8.com/fluency/96/shopping-cart.png" alt="One App" />
            <h3>One App for All</h3>
            <p>Shop groceries, medicines, and hardware from nearby stores in one place.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/fluency/96/map-marker.png" alt="Location" />
            <h3>Nearby Store Discovery</h3>
            <p>Find and connect with the best local stores based on your location.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/fluency/96/qr-code.png" alt="QR Billing" />
            <h3>Fast QR Billing</h3>
            <p>Pay instantly by scanning store QR codes with integrated UPI payments.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Join the Future of Local Commerce</h2>
        <p>Digitalize your store or shop smarter as a customer — all with BizNest.</p>
        <div className="cta-buttons">
          <Link to="/signup?role=customer" className="btn-primary">
            Sign Up as Customer
          </Link>
          <Link to="/signup?role=shopkeeper" className="btn-secondary">
            Sign Up as Shopkeeper
          </Link>
        </div>
      </section>
    </div>
  );
}
