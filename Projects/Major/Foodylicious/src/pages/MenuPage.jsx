/**
 * MenuPage.jsx - Restaurant menu items page
 * Route: /menu/:id (e.g., /menu/Seafood, /menu/Chicken)
 * Purpose: Shows all food items for a specific restaurant category
 * Data Source: Loader in router.jsx (fetches BEFORE component renders)
 */

import { useLoaderData } from "react-router";
import { useCart } from "../context/CartContext";
import SectionHeader from "../components/ui/SectionHeader";
import BackButton from "../components/ui/BackButton";
import FoodCard from "../components/ui/FoodCard";

// MenuPage COMPONENT:
// This component receives pre-fetched data from the loader in router.jsx.
// The loader extracts URL params and fetches both "menu" AND "item details".
// No useEffect needed - data is guaranteed to be available when this renders.
function MenuPage() {
  /**
   * --------------------------------------------------------------------------
   * DATA FROM LOADER:
   * useLoaderData() returns what the loader function returned in router.jsx.
   * The loader returns: { menu, itemDetails }
   *
   * menu: { restaurantName: "...", items: [...] }
   * itemDetails: { "123": {description: "..."}, "456": {description: "..."} }
   *
   * Both are fetched in "parallel" by the loader before this component renders.
   * --------------------------------------------------------------------------
   */

  const { menu, itemDetails } = useLoaderData();

  // Get addToCart function from CartContext (shared cart state)
  const { addToCart } = useCart();

  // MAIN RENDER - Show menu items.
  // Data is already loaded by the router, so no loading or null checks are needed.
  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <BackButton to="/restaurants" label="Back to Restaurants" />

        <SectionHeader
          title={menu.restaurantName}
          subtitle="Browse our delicious menu and add items to your cart"
        />

        {/* ------------------------------------------------------------------ */}
        {/* MENU ITEMS GRID:                                                   */}
        {/* row-cols-1:     1 card per row on mobile   (100% width)            */}
        {/* row-cols-md-2:  2 cards per row on tablets (50% each) ,   (≥768px) */}
        {/* row-cols-lg-3:  3 cards per row on desktop (33.33% each) ,(≥992px) */}
        {/* g-4:            gap of 1.5rem between cards                        */}
        {/* ------------------------------------------------------------------ */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {menu.items.map((item) => {
            // Get description from itemDetails, truncate if too long.
            const desc = itemDetails[item.id]?.description;

            const truncated =
              desc?.length > 120 ? desc.substring(0, 120) + "..." : desc;

            return (
              <div className="col" key={item.id}>
                <FoodCard
                  variant="menu"
                  image={item.image}
                  title={item.name}
                  subtitle={truncated}
                  price={item.price}
                  isLoading={false} // Data is already loaded
                  onButtonClick={() => addToCart(item)}
                  buttonText="Add to Cart"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MenuPage;
