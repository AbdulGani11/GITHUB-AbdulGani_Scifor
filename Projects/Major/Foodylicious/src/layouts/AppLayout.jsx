// AppLayout.jsx - Main Layout Component (React Router v7 Pattern)
// Purpose: Wraps all pages with a Header, Footer, and Loading Spinner so they stay visible at all times

import { Outlet, useNavigation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

// AppLayout Component: This component provides the shared layout for ALL pages.
// Structure:
//   <Header />           ← Always visible (persistent)
//   <LoadingIndicator /> ← Shows during navigation (spinner in content area)
//   <Outlet />           ← Child routes render here (dynamic)
//   <Footer />           ← Always visible (persistent)
//
// Pattern: The <Outlet /> is a "slot" where React Router swaps in the correct page (Home, Restaurants, Menu)—only this part updates, while the rest of the layout (Header, Footer) stays fixed.

function AppLayout() {
  // NAVIGATION STATE:
  // useNavigation() gives us information about the current navigation.
  //
  // navigation.state can be:
  //   - "loading": A loader is fetching data (user clicked a link)
  //
  // We use this to show a loading indicator when data is being fetched.

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {/* HEADER - Always visible at the top */}
      <Header />

      {/* MAIN CONTENT AREA - Child routes render here                         */}
      {/* <Outlet /> is the "placeholder" where React Router injects the component for the current route (Home, Restaurants, Menu, etc.)                                                 */}
      {/*                                                                      */}
      {/* Example:                                                             */}
      {/*   URL: /              → <Home /> renders inside Outlet               */}
      {/*   URL: /restaurants   → <Restaurants /> renders inside Outlet        */}
      {/*   URL: /menu/Seafood  → <MenuPage /> renders inside Outlet           */}
      <main>
        {/* LOADING SPINNER - Placed inside <main> so Header/Footer stay visible during loading (true SPA experience). Only the content area updates. */}
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center py-5"
            style={{ minHeight: "50vh" }}
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

      {/* FOOTER - Always visible at the bottom                                */}
      <Footer />
    </>
  );
}

export default AppLayout;
