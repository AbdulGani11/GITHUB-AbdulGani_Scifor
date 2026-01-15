// Cart.jsx - Shopping cart page at "Route: /cart" that uses CartContext (shared state) to display items, allow quantity changes, and show the order summary.

import { Link } from "react-router";
import { useCart } from "../context/CartContext";

// Cart.jsx COMPONENT: Displays all items the user has added to their cart by using the "useCart" hook to access data from CartContext.
function Cart() {
  // --------------------------------------------------------------------------
  // CartContext: Uses the useCart() hook to connect to CartContext (the central shopping list for this food ordering app), using destructuring { } to extract the 'cartItems' list and functions into this Cart.jsx component.

  // cartItems:         Array of items in cart, e.g., [{id: 1, name: "Pizza", quantity: 2}]
  // removeFromCart:    Function to delete an item by ID
  // updateQuantity:    Function to change item quantity (increase/decrease)
  // clearCart:         Function to empty the entire cart
  // getCartTotal:      Function that calculates sum of all item prices
  // getCartCount:      Function that returns total number of items
  // --------------------------------------------------------------------------
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCart();

  // --------------------------------------------------------------------------
  // CALCULATE ORDER TOTALS
  // These calculations run every time the component renders.
  // When cart changes, component re-renders, and totals update automatically.
  //
  // count: Total number of items in cart (for header display)
  // subtotal: Sum of all item prices (from getCartTotal function)
  // tax: 5% of subtotal (0.05 = 5/100)
  // deliveryFee: $3 if cart has items, $0 if empty (ternary operator)
  // total: Everything added together
  // --------------------------------------------------------------------------
  const count = getCartCount();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const deliveryFee = subtotal > 0 ? 3.0 : 0; // condition ? valueIfTrue : valueIfFalse
  const total = subtotal + tax + deliveryFee;

  // EMPTY CART STATE: Uses the "Early Return" pattern (exiting the function immediately , The code below it never happens) for conditional rendering (showing different UI based on state)—when cartItems.length === 0 (no items in the array), a friendly message is shown instead of the cart UI.
  if (cartItems.length === 0) {
    return (
      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              {/* Empty cart icon */}

              <div className="empty-cart-icon mx-auto mb-4">
                <i className="ri-shopping-cart-line"></i>
              </div>

              <h2 className="font-serif mb-3 fs-4">Your Cart is Empty</h2>
              <p className="text-secondary mb-4">
                Looks like you haven't added any items yet.
              </p>

              {/* Link to restaurants page so user can start shopping */}
              <Link
                to="/restaurants"
                className="btn btn-dark rounded-pill px-4 py-2"
              >
                <i className="ri-restaurant-line me-2"></i>
                Browse Restaurants
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // MAIN RENDER (Implicit Else) - Cart with items:
  // This section only renders if cartItems.length > 0 (not empty).
  // This acts as the "else" block: we only reach here if the cart is NOT empty.
  // Uses two-column layout: Cart items (left) + Order Summary (right sticky).
  return (
    <section className="py-4 py-md-5 bg-light">
      <div className="container">
        {/* Continue Shopping Link - Above cart */}
        <div className="mb-3">
          <Link
            to="/restaurants"
            className="btn btn-link text-dark text-decoration-none p-0"
          >
            <i className="ri-arrow-left-line me-2"></i>
            Continue Shopping
          </Link>
        </div>

        <div className="row gy-3 gy-lg-4 gx-lg-4">
          {/* LEFT COLUMN - Cart Items                                        */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                {/* -------------------------------------------------------------- */}
                {/* CART HEADER - Title, item count, and clear button              */}
                {/* count variable holds total items (calculated above)            */}
                {/* Ternary: shows "Item" if 1, "Items" if more (pluralization)    */}
                {/* -------------------------------------------------------------- */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h2 className="font-serif mb-1 fs-3">Cart</h2>
                    <p className="text-secondary mb-0 small">
                      <span className="fw-medium text-dark">
                        {count} {count === 1 ? "Item" : "Items"}
                      </span>
                      <span className="mx-2">·</span>
                      Items in your bag
                    </p>
                  </div>

                  {/* Clear all button - calls clearCart() from CartContext */}
                  <button
                    className="btn btn-link text-secondary text-decoration-none p-0"
                    onClick={clearCart}
                  >
                    <i className="ri-delete-bin-line me-1"></i>Clear all
                  </button>
                </div>

                <hr className="my-0 mb-3" />

                {/* -------------------------------------------------------------- */}
                {/* CART ITEMS LIST - Horizontal row layout                        */}
                {/* map() loops through each item in cartItems array               */}
                {/* Each item has: id, name, image, price, quantity, category      */}
                {/* key={item.id} helps React track each item for efficient updates*/}
                {/* -------------------------------------------------------------- */}
                <div>
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="cart-item-row py-3">
                        {/* LEFT: Image + Name (stacks vertically on mobile) */}
                        <div className="cart-item-left">
                          {/* Item Image - Small thumbnail */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded-3 cart-item-thumb"
                          />

                          {/* Item Name and Category */}
                          {/* {item.category && (...)} only renders if category exists */}
                          <div className="cart-item-info">
                            <h6 className="font-serif fw-semibold mb-1">
                              {item.name}
                            </h6>
                            {item.category && (
                              <p className="text-secondary mb-0 small">
                                {item.category}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* RIGHT: Quantity, Price, Remove */}
                        {/* Quantity buttons: - and + */}
                        {/* updateQuantity(id, newQuantity) changes the quantity */}
                        <div className="d-flex align-items-center gap-2">
                          {/* Decrease button */}
                          <button
                            className="btn btn-outline-secondary rounded-circle cart-qty-btn d-flex align-items-center justify-content-center p-0"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <i className="ri-subtract-line"></i>
                          </button>
                          {/* Current quantity display */}
                          <span className="fw-medium text-center cart-qty-display">
                            {item.quantity}
                          </span>
                          {/* Increase button */}
                          <button
                            className="btn btn-outline-secondary rounded-circle cart-qty-btn d-flex align-items-center justify-content-center p-0"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <i className="ri-add-line"></i>
                          </button>
                        </div>

                        {/* Item total price */}
                        {/* item.price * item.quantity = total for this item */}
                        {/* .toFixed(2) formats number to 2 decimal places */}
                        <span className="fw-bold cart-item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        {/* Remove button - removes item from cart */}
                        <button
                          className="btn btn-link text-secondary text-decoration-none p-0"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <i className="ri-close-line fs-5"></i>
                        </button>
                      </div>

                      {/* Divider between items (except after last item) */}
                      {/* index < cartItems.length - 1 means "not the last item" */}
                      {index < cartItems.length - 1 && <hr className="my-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Order Summary (Sticky on desktop)  */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 order-summary-card">
              <div className="card-body p-4">
                <h5 className="font-serif fw-semibold mb-4">Order Summary</h5>

                {/* -------------------------------------------------------------- */}
                {/* ORDER SUMMARY - Shows subtotal, tax, delivery, and total       */}
                {/* .toFixed(2) ensures prices show 2 decimal places (e.g., $5.00) */}
                {/* -------------------------------------------------------------- */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-secondary">Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  {/* Total row with border separator */}
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <span className="fw-semibold">Total</span>
                    <span className="fw-bold fs-5">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* CHECKOUT BUTTON - Links to checkout page  */}
                <Link
                  to="/checkout"
                  className="btn btn-dark w-100 rounded-pill py-3 d-flex align-items-center justify-content-center gap-2"
                >
                  Checkout <i className="ri-arrow-right-line"></i>
                </Link>

                <p className="text-center text-secondary mb-0 mt-3 small">
                  <i className="ri-shield-check-line me-1"></i>Secure checkout
                  guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
