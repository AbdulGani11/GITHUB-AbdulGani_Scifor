import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand text-dark">
          My React App
        </Link>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link text-dark">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link text-dark">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link text-dark">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
