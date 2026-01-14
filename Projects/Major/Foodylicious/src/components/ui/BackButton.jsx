import { Link } from "react-router";

// BackButton: Reusable navigation button to go back to a previous page

// Props = data passed into this component (like function arguments)

// Parent components:
//   - <MenuPage /> uses this to navigate back to restaurants list
//   - <FeedbackPage /> uses this to navigate back to home page

function BackButton({ to = "/", label = "Back to Home", variant = "dark" }) {
  // Choose button style based on variant (light for dark backgrounds, dark for light)
  const baseClass =
    "btn rounded-pill mb-4 d-inline-flex align-items-center gap-2";
  const variantClass =
    variant === "light" ? "btn-outline-light" : "btn-outline-dark";

  return (
    <Link to={to} className={`${baseClass} ${variantClass}`}>
      <i className="ri-arrow-left-line"></i>
      {label}
    </Link>
  );
}

export default BackButton;
