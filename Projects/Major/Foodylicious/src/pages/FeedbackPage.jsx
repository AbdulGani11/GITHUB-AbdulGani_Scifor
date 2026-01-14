// ============================================================================
// FeedbackPage.jsx - Customer testimonials and ratings page
// Route: /feedback
// Purpose: Displays customer reviews, ratings, and company statistics
// Data Source: testimonials.js (static data, no API call)
// ============================================================================

import BackButton from "../components/ui/BackButton";
import { testimonials, stats } from "../data/testimonials";

// ----------------------------------------------------------------------------
// HELPER COMPONENT: StarRating
// Shows 5 stars based on rating number (e.g., rating=3 → ★★★☆☆)
// ----------------------------------------------------------------------------
function StarRating({ rating }) {
  // Create array [1, 2, 3, 4, 5] to loop through
  const stars = [1, 2, 3, 4, 5];

  return (
    <>
      {stars.map((starNumber) => {
        // If starNumber <= rating, show filled star; otherwise outline
        const isFilled = starNumber <= rating;
        const starType = isFilled ? "fill" : "line";

        return (
          <i
            key={starNumber}
            className={`ri-star-${starType} text-warning fs-6`}
          />
        );
      })}
    </>
  );
}

// ----------------------------------------------------------------------------
// FEEDBACKPAGE COMPONENT
// Static page - displays data from testimonials.js file
// Uses map() to loop through stats and testimonials arrays
// ----------------------------------------------------------------------------
function FeedbackPage() {
  return (
    <section className="py-5 min-vh-100 feedback-page">
      <div className="container">
        {/* BackButton: Reusable component for navigation */}
        <BackButton to="/" label="Back to Home" />

        {/* ------------------------------------------------------------------ */}
        {/* PAGE HEADER - Title and subtitle                                   */}
        {/* ------------------------------------------------------------------ */}
        <div className="text-center mb-5">
          <span className="badge bg-dark rounded-pill px-4 py-2 mb-3 fs-6">
            <i className="ri-double-quotes-l me-2"></i>Testimonials
          </span>
          <h1 className="display-5 font-serif fw-bold mb-3">
            What Our Customers Say
          </h1>
          <p
            className="fs-5 text-secondary mx-auto"
            style={{ maxWidth: "600px" }}
          >
            Real experiences from real food lovers who trust Foodylicious
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* STATS SECTION - Company statistics in 3 columns                    */}
        {/* row-cols-1: 1 column on mobile (stacked)                           */}
        {/* row-cols-md-3: 3 columns on tablets and up (12÷3=4 each = 33.33%)  */}
        {/* ------------------------------------------------------------------ */}
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {stats.map((stat, index) => (
            <div className="col" key={index}>
              <div className="text-center p-4">
                {/* Stat value (e.g., "50K+", "4.9") */}
                <h2 className="display-4 fw-bold text-dark mb-1">
                  {stat.value}
                </h2>

                {/* Show 5 stars if stat.showStars is true */}
                {stat.showStars && (
                  <div className="mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <i key={i} className="ri-star-fill text-warning fs-5"></i>
                    ))}
                  </div>
                )}

                {/* Stat label (e.g., "Happy Customers") */}
                <p className="text-secondary mb-0">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TESTIMONIALS GRID - Customer review cards                          */}
        {/* First card is bigger (col-lg-8), others are smaller (col-lg-4)     */}
        {/* ------------------------------------------------------------------ */}
        <div className="row g-4">
          {testimonials.map((testimonial, index) => {
            // Check if this is the first (featured) card
            const isFirstCard = index === 0;

            // First card gets bigger column and larger text/avatar
            const columnClass = isFirstCard ? "col-lg-8" : "col-lg-4";
            const textClass = isFirstCard ? "fs-5" : "";
            const avatarSize = isFirstCard ? "64px" : "50px";

            return (
              <div className={`col-md-6 ${columnClass}`} key={testimonial.id}>
                <div className="card border-0 h-100 feedback-card">
                  <div className="card-body p-4 p-lg-5">
                    {/* Decorative quote icon */}
                    <div className="feedback-quote">
                      <i className="ri-double-quotes-r"></i>
                    </div>

                    {/* Star rating */}
                    <div className="mb-3">
                      <StarRating rating={testimonial.rating} />
                    </div>

                    {/* Customer's review comment */}
                    <p
                      className={`text-dark mb-4 ${textClass}`}
                      style={{ lineHeight: 1.7 }}
                    >
                      "{testimonial.comment}"
                    </p>

                    {/* Author info: avatar, name, role, date */}
                    <div className="d-flex align-items-center mt-auto">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="rounded-circle feedback-avatar"
                        style={{ width: avatarSize, height: avatarSize }}
                      />
                      <div className="ms-3">
                        <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                        <small className="text-secondary">
                          {testimonial.role}
                        </small>
                      </div>
                      <small className="text-secondary ms-auto">
                        {testimonial.date}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeedbackPage;
