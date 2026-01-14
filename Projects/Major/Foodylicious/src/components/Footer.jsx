// Footer: Site footer with brand, links, and social icons
// imported in AppLayout COMPONENT.

import { Link } from "react-router";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <h5 className="font-serif fw-medium mb-3">Foodylicious</h5>
            <p className="text-white-50 small mb-4">
              Delivering exceptional culinary experiences since 2020. Quality
              food, delivered with care.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50 fs-5 text-decoration-none">
                <i class="ri-instagram-fill"></i>
              </a>
              <a href="#" className="text-white-50 fs-5 text-decoration-none">
                <i className="ri-twitter-x-fill"></i>
              </a>
              <a href="#" className="text-white-50 fs-5 text-decoration-none">
                <i className="ri-linkedin-box-fill"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-medium mb-3">Quick Links</h6>

            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-white-50 text-decoration-none small"
                >
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/restaurants"
                  className="text-white-50 text-decoration-none small"
                >
                  Restaurants
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-white-50 text-decoration-none small"
                >
                  About Us
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/feedback"
                  className="text-white-50 text-decoration-none small"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-medium mb-3">Support</h6>

            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#contact"
                  className="text-white-50 text-decoration-none small"
                >
                  Contact Us
                </a>
              </li>

              <li className="mb-2">
                <Link
                  to="/cart"
                  className="text-white-50 text-decoration-none small"
                >
                  Your Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-medium mb-3">Contact</h6>

            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="ri-map-pin-fill text-white-50"></i>
                <span className="text-white-50 small">
                  123 Food Street, Cuisine City
                </span>
              </li>

              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="ri-mail-fill text-white-50"></i>
                <span className="text-white-50 small">
                  hello@foodylicious.com
                </span>
              </li>

              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="ri-phone-fill text-white-50"></i>
                <span className="text-white-50 small">+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 opacity-25" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white-50 small mb-0">
            &copy; {currentYear} Foodylicious. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
