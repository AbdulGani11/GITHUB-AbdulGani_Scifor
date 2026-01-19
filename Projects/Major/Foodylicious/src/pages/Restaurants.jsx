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

// RESTAURANTS COMPONENT: This component receives pre-fetched data from the loader, so no useEffect is needed because data is guaranteed at render time
function Restaurants() {
  // --------------------------------------------------------------------------
  // DATA FROM LOADER:
  // useLoaderData() gets restaurant data returned by the loader in router.jsx.
  //
  // Flow:
  // 1. User navigates to the /restaurants route.
  // 2. React Router runs the loader first and fetches the data.
  // 3. The component renders only after the data is ready.
  //
  // Result:
  // - Data is guaranteed to be available here, so no loading state is needed.
  // - Errors are handled by the router's errorElement.
  // --------------------------------------------------------------------------
  const restaurants = useLoaderData();

  // --------------------------------------------------------------------------
  // FILTER STATE VARIABLES:
  // These states are used only for UI interactions, not for data fetching.
  // They control search input, filter visibility, and selected filters.
  const [searchTerm, setSearchTerm] = useState("");                   // Stores user search text
  const [showFilters, setShowFilters] = useState(false);              // Shows or hides the filter panel
  const [selectedBadges, setSelectedBadges] = useState([]);           // Stores selected badge filters
  const [selectedCategories, setSelectedCategories] = useState([]);   // Stores selected category filters

  // --------------------------------------------------------------------------
  // TOGGLE FUNCTIONS
  // Generic toggle logic for multi-select arrays (Badges & Categories).
  // Clicking adds item, clicking again removes it.
  //
  // HOW IT WORKS:
  // 1. toggleItem: Accepts the item to toggle and the specific setState function.
  // 2. prev.includes(item): Checks if item is already selected.
  // 3. prev.filter(x => x !== item): Removes the item from array.
  // 4. [...prev, item]: Adds item to end of array (spread operator).
  // --------------------------------------------------------------------------
  const toggleItem = (item, setState) => {
    setState(
      (prev) =>
        prev.includes(item)
          ? prev.filter((x) => x !== item) // Remove if selected
          : [...prev, item] // Add if not selected
    );
  };

  const toggleBadge = (badge) => toggleItem(badge, setSelectedBadges);
  const toggleCategory = (category) =>
    toggleItem(category, setSelectedCategories);

  // --------------------------------------------------------------------------
  // FILTER LOGIC
  // filter() creates a new array containing items that pass all conditions.
  // toLowerCase() makes search case-insensitive ("Pizza" matches "pizza").
  // includes() checks if a string contains the search term.
  // length === 0 means no filter selected, so all items are allowed.
  // --------------------------------------------------------------------------
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Check if name or cuisine matches the search term
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if restaurant's badge matches selected badges (or none selected)
    const matchesBadge =
      selectedBadges.length === 0 || selectedBadges.includes(restaurant.badge);

    // Check if restaurant's cuisine matches selected categories (or none selected)
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(restaurant.cuisine);

    // Restaurant must match all conditions to be shown
    return matchesSearch && matchesBadge && matchesCategory;
  });

  // Clear all active filters and reset the search term to the default state
  const clearFilters = () => {
    setSelectedBadges([]);
    setSelectedCategories([]);
    setSearchTerm("");
  };

  // Check if any filter is active (for showing "Clear all" button)
  const hasActiveFilters =
    selectedBadges.length > 0 || selectedCategories.length > 0;

  // MAIN RENDER: No conditional returns needed - data is always available!
  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <SectionHeader
          title="Our Partner Restaurants"
          subtitle="Discover amazing restaurants near you"
        />

        {/* SEARCH & FILTER BAR:          */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-8">
            <div className="d-flex gap-2">
              {/* SEARCH INPUT – Controlled by searchTerm state and updated on every keystroke via onChange */}
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

        {/* FILTER PANEL – Renders only when showFilters is true using conditional rendering */}
        {showFilters && (
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-md-10">
              <div className="bg-white rounded-4 p-4 shadow-sm">
                {/* Badge Filter Group */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3 text-secondary">
                    <i className="ri-price-tag-3-line me-2"></i>By Badge
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {/* map() loops through badgeFilters array from filters.js */}
                    {badgeFilters.map((badge) => {
                      const isSelected = selectedBadges.includes(badge);
                      return (
                        <button
                          key={badge}
                          onClick={() => toggleBadge(badge)}
                          className={`btn btn-sm rounded-pill px-3 ${
                            isSelected ? "btn-dark" : "btn-outline-secondary"
                          }`}
                        >
                          {isSelected && <i className="ri-check-line me-1"></i>}
                          {badge}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Category Filter Group Header */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3 text-secondary">
                    <i className="ri-restaurant-2-line me-2"></i>By Category
                  </h6>

                  {/* Non-Vegetarian Filter Group */}
                  <div className="mb-3">
                    <span className="badge bg-danger me-2 mb-2">Non-Veg</span>
                    <div className="d-flex flex-wrap gap-2">
                      {categoryFilters["Non-Veg"].map((category) => {
                        const isSelected =
                          selectedCategories.includes(category);
                        return (
                          <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`btn btn-sm rounded-pill px-3 ${
                              isSelected
                                ? "btn-danger"
                                : "btn-outline-secondary"
                            }`}
                          >
                            {isSelected && (
                              <i className="ri-check-line me-1"></i>
                            )}
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vegetarian Filter Group */}
                  <div>
                    <span className="badge bg-success me-2 mb-2">Veg</span>
                    <div className="d-flex flex-wrap gap-2">
                      {categoryFilters["Veg"].map((category) => {
                        const isSelected =
                          selectedCategories.includes(category);
                        return (
                          <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`btn btn-sm rounded-pill px-3 ${
                              isSelected
                                ? "btn-success"
                                : "btn-outline-secondary"
                            }`}
                          >
                            {isSelected && (
                              <i className="ri-check-line me-1"></i>
                            )}
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Global Filter Reset */}
                {hasActiveFilters && (
                  <button
                    className="btn btn-link text-danger p-0 text-decoration-none"
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

        {/* ACTIVE FILTERS DISPLAY – Shows currently selected filters as removable tags */}
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

        {/* Result Status: Shows filtered count vs total count */}
        <div className="text-center mb-4">
          <small className="text-secondary">
            {`Showing ${filteredRestaurants.length} of ${restaurants.length} restaurants`}
          </small>
        </div>

        {/* RESTAURANT CARDS GRID:                                             */}
        {/* row-cols-1:     1 card per row on mobile (12÷1=12  = 100% width)   */}
        {/* row-cols-md-2:  2 cards per row on tablets (12÷2=6 = 50% each)     */}
        {/* row-cols-lg-3:  3 cards per row on desktop (12÷3=4 = 33.33% each)  */}
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

        {/* No Results Fallback: Feedback message & reset button */}
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
