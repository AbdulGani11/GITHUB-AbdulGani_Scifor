// App.jsx - Root component (the starting point of the entire application)
// This file sets up two things:
// 1. Global Providers: CartContext (shopping cart state) and Toaster (notifications)
// 2. Routing: Which page component to show based on the URL

import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import router from "./router"; // Central routing config (routes + loaders)

// ----------------------------------------------------------------------------
// APP COMPONENT:
// CartProvider: Wraps everything so any component can access the shopping cart.
// Toaster: Shows popup notifications (e.g., "Item added to cart!")
// RouterProvider: Renders the correct page based on the current URL
//
// Structure (outside to inside):
//   <CartProvider>      - Provides cart state to all components
//     <Toaster />       - Toast notifications (can be anywhere)
//     <RouterProvider /> - Renders the app based on current URL
// ----------------------------------------------------------------------------
function App() {
  return (
    <CartProvider>
      {/* Toast Notifications - Global notification system */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          success: {
            duration: 2000,
          },
          error: {
            duration: 2000,
          },
        }}
      />

      {/* Router Provider - Renders the app based on URL */}
      {/* This replaces the old <BrowserRouter> pattern */}
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
