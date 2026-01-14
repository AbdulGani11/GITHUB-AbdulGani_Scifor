// ============================================================================
// Restaurants.jsx - Restaurant listing page with search and filters
// Route: /restaurants
// Purpose: Displays restaurants as cards with search and filters
// Data Source: Loader in router.jsx (fetches BEFORE component renders)
// ============================================================================

import { useState } from "react";
import { useLoaderData } from "react-router";
import { badgeFilters, categoryFilters } from "../data/filters";
import SectionHeader from "../components/ui/SectionHeader";
import FoodCard from "../components/ui/FoodCard";

// ----------------------------------------------------------------------------
// RESTAURANTS COMPONENT
// This component receives pre-fetched data from the loader.
// No useEffect needed - data is guaranteed to be available when this renders.
// ----------------------------------------------------------------------------
function Restaurants() {

  // --------------------------------------------------------------------------
  // DATA FROM LOADER
  // useLoaderData() returns what the loader function returned in router.jsx.
  // The data is GUARANTEED to be here because:
  //   1. User clicks link to /restaurants
  //   2. Router runs the loader function FIRST
  //   3. Loader fetches data and returns it
  //   4. THEN this component renders with data ready
  //
  // No loading state needed - component only renders when data is ready!
  // No error handling needed - errorElement in router catches errors!
  // --------------------------------------------------------------------------
  const restaurants = useLoaderData();

  // --------------------------------------------------------------------------
  // FILTER STATE VARIABLES
  // These remain unchanged - they control UI interactions, not data fetching.
  // --------------------------------------------------------------------------
  const [searchTerm, setSearchTerm] = useState("");        // User's search input
  const [showFilters, setShowFilters] = useState(false);   // Toggle filter panel visibility
  const [selectedBadges, setSelectedBadges] = useState([]); // Selected badge filters (array)
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected category filters

  // --------------------------------------------------------------------------
  // TOGGLE FUNCTIONS
  // These handle multi-select: clicking adds item, clicking again removes it.
  // prev.includes(item) checks if item is already selected.
  // prev.filter(x => x !== item) removes the item from array.
  // [...prev, item] adds item to end of array (spread operator).
  // --------------------------------------------------------------------------
  const toggleBadge = (badge) => {
    setSelectedBadges((prev) =>
      prev.includes(badge)
        ? prev.filter((b) => b !== badge)  // Remove if already selected
        : [...prev, badge]                  // Add if not selected
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // --------------------------------------------------------------------------
  // FILTER LOGIC
  // filter() creates new array with items that pass all conditions.
  // toLowerCase() makes search case-insensitive ("Pizza" matches "pizza").
  // includes() checks if string contains search term.
  // length === 0 means "no filter selected" = show all.
  // --------------------------------------------------------------------------
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Check if name or cuisine contains search term
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if restaurant's badge is in selected badges (or no filter = show all)
    const matchesBadge =
      selectedBadges.length === 0 || selectedBadges.includes(restaurant.badge);

    // Check if restaurant's cuisine is in selected categories
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(restaurant.cuisine);

    // Restaurant must match ALL conditions to be shown
    return matchesSearch && matchesBadge && matchesCategory;
  });

  // Reset all filters to default state
  const clearFilters = () => {
    setSelectedBadges([]);
    setSelectedCategories([]);
    setSearchTerm("");
  };

  // Check if any filter is active (for showing "Clear all" button)
  const hasActiveFilters =
    selectedBadges.length > 0 || selectedCategories.length > 0;

  // --------------------------------------------------------------------------
  // MAIN RENDER
  // No conditional returns needed - data is always available!
  // --------------------------------------------------------------------------
  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <SectionHeader
          title="Our Partner Restaurants"
          subtitle="Discover amazing restaurants near you"
        />

        {/* ------------------------------------------------------------------ */}
        {/* SEARCH & FILTER BAR                                                */}
        {/* ------------------------------------------------------------------ */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-8">
            <div className="d-flex gap-2">

              {/* Search Input - value is controlled by searchTerm state */}
              {/* onChange updates state on every keystroke */}
              <div className="input-group shadow-sm rounded-pill overflow-hidden flex-grow-1">
                <span className="input-group-text bg-white border-0 ps-4">
                  <i className="ri-search-line text-secondary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-3 shadow-none"
                  placeholder="Search by restaurant name or cuisine..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Toggle - shows/hides filter panel */}
              <button
                className={`btn rounded-pill px-4 d-flex align-items-center gap-2 ${
                  showFilters ? "btn-dark" : "btn-outline-dark"
                }`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className="ri-filter-2-line"></i>
                <span className="d-none d-md-inline">Filters</span>
                {/* Badge showing count of active filters */}
                {hasActiveFilters && (
                  <span className="badge bg-danger rounded-pill">
                    {selectedBadges.length + selectedCategories.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FILTER PANEL - Only shown when showFilters is true                 */}
        {/* {condition && <Component />} renders Component only if true        */}
        {/* ------------------------------------------------------------------ */}
        {showFilters && (
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-md-10">
              <div className="bg-white rounded-4 p-4 shadow-sm">

                {/* Badge Filters */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3 text-secondary">
                    <i className="ri-price-tag-3-line me-2"></i>By Badge
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {/* map() loops through badgeFilters array from filters.js */}
                    {badgeFilters.map((badge) => (
                      <button
                        key={badge}
                        className={`btn btn-sm rounded-pill px-3 ${
                          selectedBadges.includes(badge)
                            ? "btn-dark"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() => toggleBadge(badge)}
                      >
                        {/* Show checkmark if selected */}
                        {selectedBadges.includes(badge) && (
                          <i className="ri-check-line me-1"></i>
                        )}
                        {badge}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filters - Grouped by Veg/Non-Veg */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3 text-secondary">
                    <i className="ri-restaurant-2-line me-2"></i>By Category
                  </h6>

                  {/* Non-Veg Options */}
                  <div className="mb-3">
                    <span className="badge bg-danger me-2 mb-2">Non-Veg</span>
                    <div className="d-flex flex-wrap gap-2">
                      {categoryFilters["Non-Veg"].map((cat) => (
                        <button
                          key={cat}
                          className={`btn btn-sm rounded-pill px-3 ${
                            selectedCategories.includes(cat)
                              ? "btn-danger"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => toggleCategory(cat)}
                        >
                          {selectedCategories.includes(cat) && (
                            <i className="ri-check-line me-1"></i>
                          )}
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Veg Options */}
                  <div>
                    <span className="badge bg-success me-2 mb-2">Veg</span>
                    <div className="d-flex flex-wrap gap-2">
                      {categoryFilters["Veg"].map((cat) => (
                        <button
                          key={cat}
                          className={`btn btn-sm rounded-pill px-3 ${
                            selectedCategories.includes(cat)
                              ? "btn-success"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => toggleCategory(cat)}
                        >
                          {selectedCategories.includes(cat) && (
                            <i className="ri-check-line me-1"></i>
                          )}
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear All Button - only shown if filters are active */}
                {hasActiveFilters && (
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={clearFilters}
                  >
                    <i className="ri-close-circle-line me-1"></i>
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* ACTIVE FILTERS DISPLAY - Shows selected filters as removable tags  */}
        {/* ------------------------------------------------------------------ */}
        {hasActiveFilters && (
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-md-8">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className="text-secondary">Active filters:</span>
                {selectedBadges.map((badge) => (
                  <span
                    key={badge}
                    className="badge bg-dark rounded-pill px-3 py-2"
                  >
                    {badge}
                    <i
                      className="ri-close-line ms-1 cursor-pointer"
                      onClick={() => toggleBadge(badge)}
                    ></i>
                  </span>
                ))}
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className={`badge rounded-pill px-3 py-2 ${
                      categoryFilters["Non-Veg"].includes(cat)
                        ? "bg-danger"
                        : "bg-success"
                    }`}
                  >
                    {cat}
                    <i
                      className="ri-close-line ms-1 cursor-pointer"
                      onClick={() => toggleCategory(cat)}
                    ></i>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="text-center mb-4">
          <small className="text-secondary">
            Showing {filteredRestaurants.length} of {restaurants.length}{" "}
            restaurants
          </small>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* RESTAURANT CARDS GRID                                              */}
        {/* row-cols-1: 1 card per row on mobile (12÷1=12 = 100% width)        */}
        {/* row-cols-md-2: 2 cards per row on tablets (12÷2=6 = 50% each)      */}
        {/* row-cols-lg-3: 3 cards per row on desktop (12÷3=4 = 33.33% each)   */}
        {/* ------------------------------------------------------------------ */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredRestaurants.map((restaurant) => (
            <div className="col" key={restaurant.id}>
              <FoodCard
                variant="restaurant"
                image={restaurant.image}
                title={restaurant.name}
                badge={restaurant.badge}
                badgeColor={restaurant.badgeColor}
                rating={restaurant.rating}
                cuisine={restaurant.cuisine}
                deliveryTime={restaurant.deliveryTime}
                linkTo={`/menu/${restaurant.category}?name=${encodeURIComponent(
                  restaurant.name
                )}`}
                buttonText="View Menu"
              />
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* EMPTY STATE - Shown when no restaurants match filters              */}
        {/* ------------------------------------------------------------------ */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-5">
            <i className="ri-restaurant-line fs-1 text-secondary"></i>
            <p className="text-secondary mt-3">No restaurants found</p>
            {hasActiveFilters && (
              <button
                className="btn btn-outline-dark rounded-pill mt-2"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Restaurants;
