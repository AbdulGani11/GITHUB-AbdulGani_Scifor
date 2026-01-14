// ============================================================================
// router.jsx - Central Routing Configuration (React Router v7 Pattern)
// Purpose: Defines all routes, layouts, loaders, and error handling
// Pattern: Config-based routing with createBrowserRouter
// ============================================================================

import { createBrowserRouter } from "react-router";

// ----------------------------------------------------------------------------
// LAYOUT & ERROR COMPONENTS
// ----------------------------------------------------------------------------
import AppLayout from "./layouts/AppLayout";
import ErrorPage from "./pages/ErrorPage";

// ----------------------------------------------------------------------------
// PAGE COMPONENTS
// ----------------------------------------------------------------------------
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import MenuPage from "./pages/MenuPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import FeedbackPage from "./pages/FeedbackPage";

// ----------------------------------------------------------------------------
// API FUNCTIONS (for loaders)
// ----------------------------------------------------------------------------
import { fetchRestaurants, fetchMenuByCategory, fetchMealDetails } from "./services/api";

// ============================================================================
// LOADER FUNCTIONS
// Loaders fetch data BEFORE the component renders.
// They receive { params, request } from the router.
//   - params: URL parameters (e.g., :id from /menu/:id)
//   - request: The fetch Request object (contains URL, search params, etc.)
// ============================================================================

/**
 * Loader for /restaurants route
 * Fetches all restaurants from the API
 */
const restaurantsLoader = async () => {
  const data = await fetchRestaurants();
  return data;
};

/**
 * Loader for /menu/:id route
 * Fetches menu items for a specific category
 * Also fetches details for each item (descriptions)
 *
 * @param {Object} params - URL parameters ({ id: "Seafood" })
 * @param {Request} request - Contains search params (?name=Ocean%20Grill)
 */
const menuLoader = async ({ params, request }) => {
  // Extract category from URL params (e.g., "Seafood" from /menu/Seafood)
  const category = params.id;

  // Extract restaurant name from query string (e.g., ?name=Ocean%20Grill)
  const url = new URL(request.url);
  const restaurantName = url.searchParams.get("name") || category + " Restaurant";

  // Fetch menu items for this category
  const menu = await fetchMenuByCategory(category, restaurantName);

  // Fetch details (descriptions) for each menu item in parallel
  // Promise.all runs all fetches at the same time (faster than one-by-one)
  const detailsResults = await Promise.all(
    menu.items.map((item) =>
      fetchMealDetails(item.id)
        .then((details) => ({ id: item.id, details }))
        .catch(() => ({ id: item.id, details: null })) // Don't crash if one fails
    )
  );

  // Convert array to object for easy lookup: { "123": {description: "..."}, ... }
  const itemDetails = {};
  detailsResults.forEach(({ id, details }) => {
    if (details) itemDetails[id] = details;
  });

  // Return both menu and details to the component
  return { menu, itemDetails };
};

// ============================================================================
// ROUTER CONFIGURATION
// createBrowserRouter creates the router instance from a config object.
// This replaces the old <BrowserRouter> + <Routes> + <Route> pattern.
// ============================================================================
const router = createBrowserRouter([
  {
    // ------------------------------------------------------------------------
    // ROOT ROUTE:
    // All pages share this layout (Header + Outlet + Footer)
    // errorElement catches errors in ANY child route
    // ------------------------------------------------------------------------
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,

    // ------------------------------------------------------------------------
    // CHILD ROUTES
    // These render inside <Outlet /> in AppLayout
    // ------------------------------------------------------------------------
    children: [
      {
        // Home page - index: true means this matches exactly "/"
        index: true,
        element: <Home />,
      },
      {
        // Restaurants listing page
        path: "restaurants",
        element: <Restaurants />,
        loader: restaurantsLoader, // Data fetched BEFORE component renders
      },
      {
        // Menu page for a specific restaurant category
        // :id is a URL parameter (e.g., /menu/Seafood)
        path: "menu/:id",
        element: <MenuPage />,
        loader: menuLoader, // Fetches menu AND item details
      },
      {
        // Shopping cart page
        path: "cart",
        element: <Cart />,
      },
      {
        // Checkout page
        path: "checkout",
        element: <Checkout />,
      },
      {
        // About us page
        path: "about",
        element: <AboutUs />,
      },
      {
        // Customer feedback/testimonials page
        path: "feedback",
        element: <FeedbackPage />,
      },
    ],
  },
]);

export default router;
