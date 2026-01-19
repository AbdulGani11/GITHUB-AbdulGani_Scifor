// Header: Main navigation bar with logo, menu links, and cart button

// Link = basic navigation (no active styling)
// NavLink = navigation with isActive prop for highlighting current page
import { Link, NavLink } from "react-router";
import { useCart } from "../context/CartContext";

function Header() {
  // useCart() = custom hook that gives us access to cart data.
  // getCartCount() = returns total number of items in cart.
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="navbar navbar-expand-lg px-4 px-md-5 py-3 py-md-4 bg-transparent">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link
          to="/"
          className="navbar-brand fs-4 fw-medium text-dark font-serif"
        >
          Foodylicious
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="navbar-toggler border-0 shadow-none"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <i className="ri-menu-line fs-4"></i>
        </button>

        {/* Collapsible Nav Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Nav Links */}
          <ul className="navbar-nav mx-auto gap-md-4 pt-3 pt-md-0">
            <li className="nav-item py-2 py-md-0">
              {/* NavLink: className receives { isActive } to conditionally apply 'active' class */}
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item py-2 py-md-0">
              <NavLink
                to="/restaurants"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                Restaurants
              </NavLink>
            </li>

            <li className="nav-item py-2 py-md-0">
              <a href="/#menu" className="nav-link">
                Explore Dishes
              </a>
            </li>

            <li className="nav-item py-2 py-md-0">
              <a href="/#chefs-selection" className="nav-link">
                Chef's Selection
              </a>
            </li>

            <li className="nav-item py-2 py-md-0">
              <NavLink
                to="/feedback"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                Customer Feedback
              </NavLink>
            </li>

            <li className="nav-item py-2 py-md-0">
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                About Us
              </NavLink>
            </li>

            <li className="nav-item py-2 py-md-0">
              <a href="/#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>

          {/* CTA Buttons */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
            {/* View Cart Button */}
            <Link
              to="/cart"
              className="btn btn-outline-dark rounded-pill px-4 py-2 position-relative d-flex align-items-center gap-2"
            >
              <i className="ri-shopping-cart-2-line"></i>
              <span>Cart</span>
              {cartCount > 0 && (
                <span
                  className="position-absolute badge rounded-pill bg-danger"
                  style={{ top: "-8px", right: "-8px", fontSize: "0.7rem" }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
