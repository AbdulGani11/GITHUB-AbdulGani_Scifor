// Checkout.jsx COMPONENT - Order completion page at "Route: /checkout" that uses CartContext (items) and local state (form) to collect customer details with validation before placing the final order.

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import validator from "validator";
import SectionHeader from "../components/ui/SectionHeader";

function Checkout() {
  // NAVIGATION HOOK: Uses useNavigate() to automatically switch pages via code (e.g., navigate('/')) after specific actions—for example, taking the user to the home page after a successful order.
  const navigate = useNavigate();

  // CART CONTEXT: Uses the useCart() hook to access CartContext, destructuring { } only the essential data and functions (cartItems, getCartTotal, clearCart) needed to process the checkout.
  const { cartItems, getCartTotal, clearCart } = useCart();

  /**
   * FORM STATE MANAGEMENT:
   * useState with an object stores all form fields in one place. This is called a "controlled form" - React controls the input values.
   *
   * @property {Object} formData - Stores user input for all fields
   * @property {Object} errors - Stores validation error messages for each field
   * @property {string} paymentMethod - Which payment option is selected ('cod' = Cash on Delivery, 'card' = Card Payment)
   * @property {boolean} isSubmitting - True while order is being processed (shows loading)
   * @property {boolean} showSuccess - True after order is placed (shows success message)
   * @property {number} finalTotal - Stores the total at submission time for success screen
   */
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);

  // CALCULATE ORDER TOTALS: Uses the same calculation logic as Cart.jsx to ensure consistency.
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const deliveryFee = 3.0;
  const total = subtotal + tax + deliveryFee;

  /**
   * HANDLE INPUT CHANGES:
   * This function runs every time user types in any input field.
   *
   * @param {Event} event - The input change event
   *
   * @description
   * event.target gives us the input element that triggered the event.
   * I destructure { name, value } from the element to get fieldName and fieldValue.
   *
   * setFormData: Copy all previous values (...prevFormData),
   * then overwrite only the field that changed ([fieldName]: fieldValue).
   *
   * I also clear the error for this field when user starts typing again.
   */
  const handleInputChange = (event) => {
    const { name: fieldName, value: fieldValue } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: fieldValue,
    }));
    if (errors[fieldName]) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    }
  };

  /**
   * FORM VALIDATION:
   * Checks all fields and returns true if valid, false if errors found.
   *
   * @returns {boolean} - true if form is valid, false if errors are found
   *
   * @description
   * .trim() removes whitespace from start/end of string.
   *
   * Uses validator.js library for phone and email validation:
   * - validator.isMobilePhone(phone, "en-IN") checks valid Indian phone number
   * - validator.isEmail(email) checks valid email format
   */
  const validateForm = () => {
    // Empty object to collect error messages - each field with an error gets added as a property (e.g., { name: "Name is required", phone: "..." })
    const newErrors = {};

    // Name validation - required
    // Uses .trim() because computers see spaces as real characters (" "), stripping them to empty (""); the "!" operator then flips this empty result to TRUE to trigger the error.
    // Note: In JavaScript, an empty string ("") is considered "False" (Falsy).

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone validation - required + must be valid Indian mobile number
    // validator.isMobilePhone() checks if it's a valid phone format for India ("en-IN")
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validator.isMobilePhone(formData.phone, "en-IN")) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    // Email validation - required + must be valid email format
    // validator.isEmail() checks if it's a properly formatted email address
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validator.isEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Address validation - required + minimum length
    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    // Update the errors state with all validation messages collected in newErrors object
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // HANDLE ORDER SUBMISSION:
  const handlePlaceOrder = async (e) => {
    e.preventDefault(); // e.preventDefault() stops the form from refreshing the page (default behavior).

    // Validate form before proceeding
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true); // Show loading spinner

    // Simulate API call with 2 second delay
    // In a real app, this would be: await fetch('/api/orders', {...})
    // setTimeout() schedules the redirect to home after 3 seconds.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Order successful - update states
    setIsSubmitting(false);
    setFinalTotal(total); // Save total for success screen
    setShowSuccess(true); // Show success message
    clearCart(); // Empty the cart

    // Redirect to home page after 3 seconds
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  // EMPTY CART STATE - Early return pattern
  // Shows message if user comes to checkout with empty cart.
  // !showSuccess ensures we don't show this after successful order (when cart is cleared).
  if (cartItems.length === 0 && !showSuccess) {
    return (
      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="text-center py-5">
            <i className="ri-shopping-cart-line fs-1 text-secondary mb-3 d-block"></i>
            <h2 className="font-serif mb-3">Your Cart is Empty</h2>
            <p className="text-secondary mb-4">
              Add some items to your cart before checking out.
            </p>
            <Link to="/restaurants" className="btn btn-dark rounded-pill px-4">
              <i className="ri-restaurant-line me-2"></i>Browse Restaurants
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ORDER SUCCESS STATE:
  // Shown after order is successfully placed.
  // Displays thank you message and order total, then redirects to home.
  if (showSuccess) {
    return (
      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="text-center py-5">
            {/* Success checkmark icon */}
            <div className="mb-4">
              <div className="checkout-success-icon">
                <i className="ri-check-line text-white"></i>
              </div>
            </div>

            <h2 className="font-serif mb-3 text-success">
              Order Placed Successfully!
            </h2>

            <p className="text-secondary mb-2">
              Thank you for your order, <strong>{formData.name}</strong>!
            </p>

            <p className="text-secondary mb-4">
              Your delicious food is being prepared and will be delivered to you
              soon.
            </p>

            {/* Order total card */}
            <div className="card d-inline-block shadow-sm border-0 mb-4">
              <div className="card-body px-5 py-3">
                <p className="mb-1 text-secondary small">Order Total</p>

                <h3 className="mb-0 font-serif">${finalTotal.toFixed(2)}</h3>
              </div>
            </div>
            <p className="text-secondary small">
              <i className="ri-time-line me-1"></i>
              Redirecting to home page in 3 seconds...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // MAIN CHECKOUT FORM:
  // Two-column layout: Left (col-lg-7) for form, Right (col-lg-5) for summary.
  // Cannot use row-cols pattern here because columns have different widths.
  // The form uses 'onSubmit' to handle the submit button click.
  // --------------------------------------------------------------------------
  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <SectionHeader title="Checkout" subtitle="Complete your order" />

        {/* Form wraps both columns - submit button is in right column */}
        <form onSubmit={handlePlaceOrder}>
          <div className="row g-4">
            {/* ---------------------------------------------------------------- */}
            {/* LEFT COLUMN - Customer Details & Payment Method (7/12 width)    */}
            {/* col-lg-7 means this column takes 7 of 12 grid columns on large  */}
            {/* screens, which equals 58.33% width.                              */}
            {/* ---------------------------------------------------------------- */}
            <div className="col-lg-7">
              {/* ============================================================== */}
              {/* CUSTOMER DETAILS CARD                                          */}
              {/* Contains name, phone, email, and address inputs.               */}
              {/* Each input has: controlled value, onChange handler, error display */}
              {/* ============================================================== */}
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4">
                  <h5 className="fw-semibold mb-4">
                    <i className="ri-user-line me-2"></i>Customer Details
                  </h5>

                  <div className="row g-3">
                    {/* Name Input - col-md-6 means 50% width on medium screens */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                      {/* Bootstrap's is-invalid class shows red border */}
                      {/* invalid-feedback shows error message below input */}
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>

                    {/* Phone Input with country code prefix */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">+91</span>
                        <input
                          type="tel"
                          className={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="9876543210"
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>
                    </div>

                    {/* Email Input - col-12 means full width */}
                    <div className="col-12">
                      <label className="form-label">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    {/* Address Textarea - larger input for multi-line address */}
                    <div className="col-12">
                      <label className="form-label">
                        Delivery Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className={`form-control ${
                          errors.address ? "is-invalid" : ""
                        }`}
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Enter your complete delivery address..."
                      ></textarea>
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================================== */}
              {/* PAYMENT METHOD CARD                                            */}
              {/* Radio buttons for selecting payment type.                      */}
              {/* Uses <label> wrapper to make entire card clickable.            */}
              {/* Border changes color based on selected option.                 */}
              {/* ============================================================== */}
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <h5 className="fw-semibold mb-4">
                    <i className="ri-bank-card-line me-2"></i>Payment Method
                  </h5>

                  <div className="d-flex flex-column gap-3">
                    {/* Cash on Delivery Option */}
                    {/* Ternary changes border color when selected */}
                    <label
                      className={`card border-2 cursor-pointer mb-0 ${
                        paymentMethod === "cod" ? "border-dark" : "border-light"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body p-3">
                        <div className="form-check d-flex align-items-center gap-3 mb-0">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <div>
                            <span className="fw-medium">
                              <i className="ri-money-dollar-circle-line me-2 text-success"></i>
                              Cash on Delivery
                            </span>
                            <p className="mb-0 text-secondary small">
                              Pay when your order arrives
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* Card Payment Option */}
                    <label
                      className={`card border-2 cursor-pointer mb-0 ${
                        paymentMethod === "card"
                          ? "border-dark"
                          : "border-light"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body p-3">
                        <div className="form-check d-flex align-items-center gap-3 mb-0">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <div>
                            <span className="fw-medium">
                              <i className="ri-visa-line me-2 text-primary"></i>
                              Credit/Debit Card
                            </span>
                            <p className="mb-0 text-secondary small">
                              Pay securely with your card
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* Notice shown only when card is selected */}
                    {/* {condition && <Component />} = conditional rendering */}
                    {paymentMethod === "card" && (
                      <div className="card bg-light border-0">
                        <div className="card-body p-3">
                          <p className="text-secondary small mb-0">
                            <i className="ri-information-line me-1"></i>
                            Card payment integration coming soon. Please use
                            Cash on Delivery for now.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* RIGHT COLUMN - Order Summary (5/12 width)                        */}
            {/* col-lg-5 = 5 of 12 columns = 41.67% width on large screens       */}
            {/* sticky-top keeps this card visible while scrolling the form      */}
            {/* ---------------------------------------------------------------- */}
            <div className="col-lg-5">
              <div
                className="card shadow-sm border-0 sticky-top"
                style={{ top: "20px" }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-semibold mb-4">
                    <i className="ri-file-list-3-line me-2"></i>Order Summary
                  </h5>

                  {/* Cart Items List - scrollable if many items */}
                  {/* maxHeight + overflowY: auto makes it scroll when content is tall */}
                  <div
                    className="mb-4"
                    style={{ maxHeight: "250px", overflowY: "auto" }}
                  >
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex align-items-center gap-3 mb-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0 small fw-medium">{item.name}</h6>
                          <small className="text-secondary">
                            Qty: {item.quantity}
                          </small>
                        </div>
                        <span className="fw-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <hr />

                  {/* Price Breakdown */}
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

                  <hr />

                  {/* Total */}
                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-5">${total.toFixed(2)}</span>
                  </div>

                  {/* ---------------------------------------------------------- */}
                  {/* PLACE ORDER BUTTON                                         */}
                  {/* type="submit" triggers form's onSubmit handler             */}
                  {/* disabled={isSubmitting} prevents double-clicks             */}
                  {/* Shows spinner when processing, arrow when ready            */}
                  {/* ---------------------------------------------------------- */}
                  <button
                    type="submit"
                    className="btn btn-dark w-100 rounded-pill py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order <i className="ri-arrow-right-line ms-2"></i>
                      </>
                    )}
                  </button>

                  {/* Back to Cart Link */}
                  <Link
                    to="/cart"
                    className="btn btn-link text-secondary w-100 mt-2"
                  >
                    <i className="ri-arrow-left-line me-1"></i>Back to Cart
                  </Link>

                  {/* Security Note */}
                  <p className="text-center text-secondary small mt-3 mb-0">
                    <i className="ri-shield-check-line me-1"></i>
                    Your information is secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Checkout;
