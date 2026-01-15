// AboutUs.jsx — Company information and story page at the /about route that displays the company’s history, mission, and timeline milestones

import { Link } from "react-router";
import BackButton from "../components/ui/BackButton";

// STATIC DATA:
// 1. This "TIMELINE" array holds the company timeline milestones.
//
// 2. Each object has: year (short), title (heading), desc (description)
//
// 3. I define "TIMELINE" array of objects outside the component so it doesn't recreate on every render.
const TIMELINE = [
  {
    year: "20",
    title: "2020 - The Beginning",
    desc: "Launched with 10 restaurant partners",
  },
  {
    year: "22",
    title: "2022 - Rapid Growth",
    desc: "Expanded to 200+ restaurants citywide",
  },
  {
    year: "26",
    title: "2026 - Today",
    desc: "500+ partners, serving 50K+ customers",
  },
];

// this AboutUs component is a static page with no state or API calls that simply renders the company information.
function AboutUs() {
  return (
    <div className="about-page">
      {/* HERO SECTION - Page header with title and CTA button*/}
      <section className="py-5 bg-light">
        <div className="container py-4">
          {/* BackButton: Reusable component that navigates user back to home */}
          <BackButton to="/" label="Back to Home" />

          {/* Page Title and Tagline */}
          <div className="text-center mb-5">
            <h1 className="font-serif fw-bold mb-3 fs-2">
              About <span className="text-accent">Foodylicious</span>
            </h1>

            <p className="text-secondary fs-5 mx-auto mb-4 about-subtitle">
              Where passion meets flavor. Delivering exceptional culinary
              experiences since 2020.
            </p>

            {/* CTA Button - Uses Link for SPA navigation (no page reload) */}
            <Link
              to="/restaurants"
              className="btn btn-dark btn-lg rounded-pill px-5"
            >
              Explore Restaurants <i className="ri-arrow-right-line ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* OUR STORY SECTION - Two-column layout with images and text. */}
      {/* Bootstrap grid:
          row-cols-1     → 1 column on mobile (stacked)
          row-cols-lg-2  → 2 columns on large screens (≥992px)

          Formula:
          Mobile:  12 ÷ 1 = 12  (12/12) → each column is 100% width
          Desktop: 12 ÷ 2 = 6   (6/12)  → each column is 50% width
      */}

      <section id="story" className="py-5 bg-light">
        <div className="container py-4">
          <div className="row row-cols-1 row-cols-lg-2 align-items-center g-5">
            {/* LEFT COLUMN: Images */}
            {/* `position-relative` allows the overlay image (something placed on top of another element — layered UI) to be positioned absolutely on top of the main image */}
            <div className="col">
              <div className="position-relative">
                {/* Main restaurant image */}
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                  alt="Restaurant"
                  className="w-100 rounded-4 about-main-image"
                />

                {/* Overlay image container — positioned on top of the main image using custom CSS; the image inside fills it using Bootstrap */}
                <div className="about-overlay-image">
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80"
                    alt="Delicious Food"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Story Content and Timeline */}
            <div className="col">
              <h2>
                <span className="fw-semibold text-uppercase about-label">
                  Our Story
                </span>
              </h2>

              <h3 className="font-serif fw-bold mt-2 mb-4 fs-3">
                From Passion to Your Plate
              </h3>

              <p className="text-secondary mb-2 lh-base">
                Founded in 2020, Foodylicious began with a simple vision: to
                bridge the gap between exceptional restaurants and food lovers
                everywhere.
              </p>

              <hr />

              <p className="text-secondary mb-4 lh-base">
                What started as a small team with big dreams has grown into a
                platform trusted by thousands. We've partnered with the finest
                local restaurants, ensuring that every meal delivered carries
                the same quality and care as dining in.
              </p>

              {/* TIMELINE: Displays company milestones: */}
              {/* 1. map() loops through TIMELINE array and renders each milestone.  */}
              {/* 2. key={index} helps React track each item for efficient updates.  */}
              <div className="d-flex flex-column gap-3 mt-4">
                {TIMELINE.map((item, index) => (
                  <div key={index} className="d-flex align-items-center gap-3">
                    {/* Circle with year number */}
                    <div className="about-timeline-circle">
                      <span className="fw-bold text-white small">
                        {item.year}
                      </span>
                    </div>

                    {/* Milestone title and description */}
                    <div>
                      <h6 className="fw-bold mb-0">{item.title}</h6>
                      <small className="text-secondary">{item.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
