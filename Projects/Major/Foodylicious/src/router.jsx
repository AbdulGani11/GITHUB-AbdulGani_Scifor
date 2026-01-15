// router.jsx — Central Routing Configuration (React Router v7)
// Purpose: Defines all routes, layouts, loaders, and error handling using the config-based pattern with createBrowserRouter

import { createBrowserRouter } from "react-router";

// LAYOUT & ERROR COMPONENTS:
import AppLayout from "./layouts/AppLayout";
import ErrorPage from "./pages/ErrorPage";

// PAGE COMPONENTS:
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import MenuPage from "./pages/MenuPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import FeedbackPage from "./pages/FeedbackPage";

// API FUNCTIONS (for loaders)
import {
  fetchRestaurants,
  fetchMenuByCategory,
  fetchMealDetails,
} from "./services/api";

// LOADER FUNCTIONS:
// These are the async functions (restaurantsLoader, menuLoader) that fetch route data BEFORE the page component renders.

// Loader for the `/restaurants` route that fetches all restaurants from the API.
const restaurantsLoader = async () => {
  const data = await fetchRestaurants();
  return data;
};

/**
 * Loader for the `/menu/:id` route that fetches menu items for a specific category and also retrieves detailed item descriptions.
 *
 * @param {Object} params  – Gives route values like `{ id: "Seafood" }` from `/menu/Seafood`, telling which category to load.
 * @param {Request} request – Provides the full URL, so `request.url` is used to read query strings like `?name=Ocean%20Grill` for the restaurant name.

 */
const menuLoader = async ({ params, request }) => {
  // Extract category from URL params (e.g., "Seafood" from /menu/Seafood)
  const category = params.id;

  // Extract restaurant name from query string (e.g., ?name=Ocean%20Grill)
  const url = new URL(request.url);
  const restaurantName =
    url.searchParams.get("name") || category + " Restaurant";

  // Fetch menu items for this category
  const menu = await fetchMenuByCategory(category, restaurantName);

  // Fetch details (descriptions) for each menu item in parallel
  // Promise.all runs all fetches at the same time (faster than one-by-one)
  const detailsResults = await Promise.all(
    menu.items.map(
      (item) =>
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

// ROUTER CONFIGURATION — createBrowserRouter builds the router from a config object.
const router = createBrowserRouter([
  {
    // ROOT ROUTE:
    // All pages share this layout (Header + Outlet + Footer) via "<AppLayout />", and "errorElement" catches errors from any child route.
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,

    // CHILD ROUTES:
    // These render inside <Outlet /> in AppLayout
    children: [
      {
        // Home page - "index: true" means this matches exactly "/"
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
        // The customer feedback page, also known as testimonials page.
        path: "feedback",
        element: <FeedbackPage />,
      },
    ],
  },
]);

export default router;
