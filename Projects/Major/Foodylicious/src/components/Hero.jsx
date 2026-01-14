// Hero: Landing section with welcome message and CTA button
// Parent component: <Home /> - first thing users see on home page

import { Link } from "react-router";

function Hero() {
  return (
    <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-start text-center mt-3 px-4 hero-section">
      {/* Main Hero Heading */}
      <h1 className="hero-heading mb-4 font-serif text-dark">
        Welcome to <span className="text-accent">Foodylicious.</span>
      </h1>

      {/* Hero Subheading */}
      <p
        className="fs-5 mb-5 text-secondary mx-auto hero-subtitle"
        style={{ fontWeight: 400 }}
      >
        Indulge in mouthwatering flavors crafted with love. From sizzling
        appetizers to decadent desserts, your culinary adventure begins here.
      </p>

      {/* Primary CTA - White Button */}
      <Link
        to="/restaurants"
        className="btn btn-hero rounded-pill shadow-lg d-inline-flex align-items-center gap-2 px-5 py-3 fw-medium"
      >
        Explore Our Menu <i className="ri-arrow-right-line"></i>
      </Link>
    </main>
  );
}

export default Hero;
