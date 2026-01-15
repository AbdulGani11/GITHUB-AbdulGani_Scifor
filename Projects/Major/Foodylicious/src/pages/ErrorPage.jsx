// ErrorPage.jsx - Global Error Boundary that catches and displays errors from any route.
// Connected in App.jsx as: errorElement: <ErrorPage />

// ----------------------------------------------------------------------------
// IMPORTS
// useRouteError: React Router hook that returns the error that was thrown
// isRouteErrorResponse: Helper function to check if error is a Response (404, 500, etc.)
// Link: React Router component for navigation (like <a> but without page reload)
// ----------------------------------------------------------------------------
import { useRouteError, isRouteErrorResponse, Link } from "react-router";

// ----------------------------------------------------------------------------
// ErrorPage COMPONENT:
// This component renders when:
//   1. User navigates to a non-existent route (404 - Page Not Found)
//   2. A component crashes (JavaScript error)
//   3. A loader throws an error (API failure)
//
// Instead of showing a blank white screen, users see a friendly error page.
// ----------------------------------------------------------------------------
function ErrorPage() {
  // --------------------------------------------------------------------------
  // GET ERROR DETAILS
  // useRouteError() returns the error that was thrown.
  // It could be:
  //   - A Response object (404, 500 from server)
  //   - An Error object (JavaScript error like TypeError)
  //   - Any other thrown value
  // --------------------------------------------------------------------------
  const error = useRouteError();

  // --------------------------------------------------------------------------
  // ERROR STATE VARIABLES
  // Using "let" (not "const") because we may change these values below.
  // Default values shown if we can't determine the specific error type.
  // --------------------------------------------------------------------------
  let title = "Something Went Wrong";
  let message = "An unexpected error occurred.";
  let is404 = false;

  // --------------------------------------------------------------------------
  // DETERMINE ERROR TYPE
  //
  // isRouteErrorResponse(error) && error.status === 404:
  //   - isRouteErrorResponse() checks if it's a Response error (like 404, 500)
  //   - error.status === 404 checks if the status code is exactly 404
  //   - && (AND) means BOTH conditions must be true
  //
  // error instanceof Error:
  //   - Checks if the error is a JavaScript Error object
  //   - Examples: TypeError, ReferenceError, custom throw new Error("...")
  // --------------------------------------------------------------------------
  if (isRouteErrorResponse(error) && error.status === 404) {
    // 404 Error - User typed a URL that doesn't exist (e.g., /randompage)
    title = "Page Not Found";
    message = "The page you are looking for does not exist.";
    is404 = true;
  }
  // else if = only check this if the first condition was false
  else if (error instanceof Error) {
    // JavaScript Error - Something crashed in the code
    // error.message contains the error description (e.g., "Cannot read property 'x' of undefined")
    message = error.message;
  }

  // --------------------------------------------------------------------------
  // RENDER ERROR UI
  //
  // Bootstrap classes used:
  //   - min-vh-100: Minimum height 100% of viewport (full screen)
  //   - d-flex, align-items-center, justify-content-center: Center content
  //   - position-relative: Needed for the internal style fix
  //
  // Internal Style Fix:
  //   - <style>{`...`}</style> injects CSS directly into the page
  //   - body { margin: 0; } removes browser's default margin
  //   - overflow: hidden prevents scrollbar flicker on this page
  // --------------------------------------------------------------------------
  return (
    <section className="min-vh-100 bg-light d-flex align-items-center justify-content-center position-relative">
      {/* INTERNAL STYLE FIX: Removes default margins to prevent scrollbar flicker */}
      <style>{`
        body { margin: 0; overflow: hidden; }
      `}</style>

      <div className="text-center container">
        {/* ---------- ERROR ICON ---------- */}
        {/* Changes icon based on error type using ternary operator */}
        {/* is404 ? "compass-discover" : "error-warning" */}
        {/* If is404 is true  → use compass icon (for "lost" feeling) */}
        {/* If is404 is false → use warning icon (for general errors) */}
        <div className="mb-4">
          <i
            className={`ri-${
              is404 ? "compass-discover" : "error-warning"
            }-line text-danger`}
            style={{ fontSize: "4rem" }}
          ></i>
        </div>

        {/* ---------- ERROR TITLE & MESSAGE ---------- */}
        {/* {title} and {message} display the values set above */}
        <h1 className="font-serif mb-3">{title}</h1>
        <p className="text-secondary mb-4">{message}</p>

        {/* ---------- RECOVERY BUTTONS ---------- */}
        <div className="d-flex gap-3 justify-content-center">
          {/* Go Home - Uses React Router Link to navigate without page reload */}
          <Link to="/" className="btn btn-dark rounded-pill px-4">
            <i className="ri-home-line me-2"></i>Go Home
          </Link>

          {/* Try Again - Uses window.location.reload() to refresh the page */}
          {/* () => is an arrow function that runs when button is clicked */}
          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline-dark rounded-pill px-4"
          >
            <i className="ri-refresh-line me-2"></i>Try Again
          </button>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
