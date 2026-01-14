// Home.jsx - Main landing page (first page users see)
// Route: / (root)
// Purpose: Combines multiple sections into one scrollable page and just arranges the child components in order.

import Hero from "../components/Hero";
import Menu from "../components/Menu";
import ChefSelection from "../components/ChefSelection";
import Contact from "../components/Contact";

// HOME COMPONENT:
// Uses a React Fragment (<>...</>) as an invisible wrapper so multiple elements can be returned without adding extra HTML to the DOM.
function Home() {
  return (
    <>
      {/* FIXED BACKGROUND IMAGE:                                                       */}
      {/* This div has CSS (in index.css) that makes it fixed at bottom.                */}
      {/* The food background image stays in place while content scrolls over it        */}
      <div className="bg-image"></div>

      {/* ------------------------------------------------------------------ */}
      {/* HERO SECTION - Welcome message and CTA (Call To Action) button     */}
      {/* full-height class makes this section take up entire viewport       */}
      {/* ------------------------------------------------------------------ */}
      <div className="full-height d-flex flex-column">
        {/* Decorative divider line below nav bar */}
        <hr className="mx-auto opacity-25 text-secondary mt-md-0 w-50" />
        <Hero />
      </div>

      {/* MENU SECTION - Bento grid showing featured dishes */}
      <Menu />

      {/* CHEF'S SELECTION - Table of special dishes */}
      <ChefSelection />

      {/* CONTACT SECTION - Contact form for user inquiries */}
      <Contact />
    </>
  );
}

export default Home;
