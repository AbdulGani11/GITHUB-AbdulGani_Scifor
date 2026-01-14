// FoodCard: Displays either a restaurant card OR a menu item card

import { Link } from "react-router";

// Props = data passed into this component (like function arguments)
// Parent components:
//   - <Restaurants /> passes restaurant data (variant="restaurant")
//   - <MenuPage /> passes menu item data (variant="menu")

function FoodCard({
  variant = "restaurant", // 'restaurant' or 'menu' - decides which layout to show
  image,
  title,
  subtitle,
  badge,
  badgeColor,
  rating,
  cuisine,
  deliveryTime,
  price,
  linkTo,
  onButtonClick,
  buttonText,
  buttonIcon,
  isLoading = false,
}) {
  // STEP 1: Determine which variant we're rendering.
  // These boolean variables make conditions easier to read
  const isRestaurant = variant === "restaurant";
  const isMenu = variant === "menu";

  // STEP 2: Prepare conditional content BEFORE the return.
  // This keeps our JSX clean and easier to read

  // Badge element - shows label like "New" or "Popular" on the image
  // (ternary operator) Syntax: condition ? valueIfTrue : valueIfFalse
  const badgeElement = badge ? (
    <span
      className="food-card-badge"
      style={{ backgroundColor: badgeColor || "#1a1a1a" }}
    >
      {badge}
    </span>
  ) : null;

  // Rating element - only for restaurant cards
  // Syntax: (condition1 && condition2) ? <JSX> : null - show JSX only if BOTH are true
  const ratingElement =
    isRestaurant && rating ? (
      <div className="food-card-rating">
        <i className="ri-star-fill text-warning"></i>
        <span>{rating}</span>
      </div>
    ) : null;

  // Restaurant meta info - cuisine type and delivery time
  const restaurantMeta = isRestaurant ? (
    <div className="food-card-meta">
      {cuisine && (
        <span>
          <i className="ri-restaurant-line me-1"></i>
          {cuisine}
        </span>
      )}
      {deliveryTime && (
        <span>
          <i className="ri-time-line me-1"></i>
          {deliveryTime}
        </span>
      )}
    </div>
  ) : null;

  // Menu subtitle - shows loading skeleton OR actual text
  // Syntax: value1 || value2 means "use value1, but if it's empty/false, use value2"
  const menuSubtitle = isMenu ? (
    <p className="food-card-subtitle">
      {isLoading ? (
        <span className="placeholder-glow">
          <span className="placeholder col-12"></span>
          <span className="placeholder col-8"></span>
        </span>
      ) : (
        subtitle || "Delicious dish prepared with care."
      )}
    </p>
  ) : null;

  // Menu price - toFixed(2) formats number to 2 decimal places (e.g., 12.99)
  const menuPrice =
    isMenu && price !== undefined ? (
      <div className="mb-3">
        <span className="food-card-price">${price.toFixed(2)}</span>
      </div>
    ) : null;

  // Action button:
  // If Restaurant -> Link to Menu Page
  // If Menu Item -> Button to Add to Cart
  const actionButton =
    isRestaurant && linkTo ? (
      // Link = navigates to another page
      <Link to={linkTo} className="food-card-btn food-card-btn-light">
        {buttonText || "View Menu"}
        <i className={buttonIcon || "ri-arrow-right-line"}></i>
      </Link>
    ) : (
      // Button = triggers an action (onClick)
      <button
        className="food-card-btn food-card-btn-dark"
        onClick={onButtonClick}
      >
        <span>{buttonText || "Add to Cart"}</span>
        <i className={buttonIcon || "ri-shopping-cart-2-fill"}></i>
      </button>
    );

  // STEP 3: Return clean JSX using our prepared variables
  return (
    <div className="food-card">
      {/* Image Section */}
      <div className="food-card-image-container">
        <img src={image} alt={title} className="food-card-image" />
        {isRestaurant && <div className="food-card-gradient" />}
        {badgeElement}
        {ratingElement}
      </div>

      {/* Card Body */}
      <div className="food-card-body">
        <h5 className="food-card-title font-serif">{title}</h5>
        {restaurantMeta}
        {menuSubtitle}
        {menuPrice}
        {actionButton}
      </div>
    </div>
  );
}

export default FoodCard;
