import { Outlet, useNavigation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * AppLayout.jsx — Main Layout Component (React Router v7)
 * Purpose: AppLayout provides the shared layout for all pages, wrapping them with a Header, Footer, and a loading spinner that stays visible across navigation.

 *
 * Structure:
 *   <Header />   ← Always visible at the top (persistent)
 *   Loading UI   ← Spinner shown during navigation (inside main content)
 *   <Outlet />   ← Child routes render here (dynamic)
 *   <Footer />   ← Always visible at the bottom (persistent)
 *
 * Pattern: <Outlet /> acts as a placeholder where React Router renders the current page (Home, Restaurants, Menu), while the Header and Footer remain fixed across all routes.
 */

function AppLayout() {
  /**
   * NAVIGATION STATE:
   * useNavigation() provides information about the current navigation.
   *
   * navigation.state can be "loading" when a route loader is fetching data after the user clicks a link
   *
   * We use this state to show a loading indicator while data is being fetched.
   */
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <Header />

      <main>
        {/* LOADING SPINNER - Placed inside <main> so Header/Footer stay visible during loading (true SPA experience). Only the content area updates. */}
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center py-5"
            style={{ minHeight: "56vh" }}
          >
            <div className="text-center">
              <div
                className="spinner-border text-dark mb-3"
                role="status"
              ></div>
              <p className="text-secondary mb-0">Loading...</p>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      <Footer />
    </>
  );
}

export default AppLayout;
