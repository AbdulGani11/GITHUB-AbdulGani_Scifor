// Context API lets you create shared data (createContext), provide it (Provider), and use it anywhere (useContext) without prop drilling.

// CartContext: Global cart state shared across all components
// Usage: Wrap app with <CartProvider>, then use useCart() hook anywhere
// Functions: addToCart, removeFromCart, updateQuantity, clearCart, getCartCount, getCartTotal

import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

// Step 1: Create an empty "container" for cart data
const CartContext = createContext();

// Step 2: Create a custom hook so components can easily access the cart.
export const useCart = () => {
  const context = useContext(CartContext);

  // Safety check: useCart() only works inside CartProvider.
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

// Step 3: Create the Provider that holds all cart logic
export const CartProvider = ({ children }) => {
  // Cart starts as empty array
  const [cartItems, setCartItems] = useState([]);

  // ADD TO CART 
  const addToCart = (item) => {
    // Check if item already exists in cart
    const existingItem = cartItems.find((cartItem) => {
      return cartItem.id === item.id;
    });

    if (existingItem) {
      // CASE 1: Item exists → increase its quantity
      setCartItems((previousItems) => {
        const updatedItems = previousItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            // This is the matching item → increase quantity
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          } else {
            // Not the item we're looking for → keep unchanged
            return cartItem;
          }
        });
        return updatedItems;
      });

      toast.success(`Added another "${item.name}" to cart!`, {
        icon: "🛒",
        duration: 2000,
      });
    } else {
      // CASE 2: Item doesn't exist → add as new
      setCartItems((previousItems) => {
        const newItem = {
          ...item,
          quantity: 1,
        };
        const updatedItems = [...previousItems, newItem];
        return updatedItems;
      });

      toast.success(`"${item.name}" added to cart!`, {
        icon: "🛒",
        duration: 2000,
      });
    }
  };

  // REMOVE FROM CART
  const removeFromCart = (itemId) => {
    // Find the item first (to show its name in toast)
    const itemToRemove = cartItems.find((cartItem) => {
      return cartItem.id === itemId;
    });

    // Keep only items that DON'T match the itemId
    setCartItems((previousItems) => {
      const updatedItems = previousItems.filter((cartItem) => {
        return cartItem.id !== itemId;
      });
      return updatedItems;
    });

    if (itemToRemove) {
      toast.error(`"${itemToRemove.name}" removed from cart`, {
        icon: "🗑️",
        duration: 2000,
      });
    }
  };

  // UPDATE QUANTITY
  const updateQuantity = (itemId, newQuantity) => {
    // If quantity is less than 1, remove the item
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    // Update the quantity for the matching item
    setCartItems((previousItems) => {
      const updatedItems = previousItems.map((cartItem) => {
        if (cartItem.id === itemId) {
          return {
            ...cartItem,
            quantity: newQuantity,
          };
        } else {
          return cartItem;
        }
      });
      return updatedItems;
    });
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared!", {
      icon: "🧹",
      duration: 2000,
    });
  };

  // GET CART COUNT (total number of items)
  const getCartCount = () => {
    let totalCount = 0;

    for (const cartItem of cartItems) {
      totalCount = totalCount + cartItem.quantity;
    }

    return totalCount;
  };

  // GET CART TOTAL (total price)
  const getCartTotal = () => {
    let totalPrice = 0;

    for (const cartItem of cartItems) {
      const itemTotal = cartItem.price * cartItem.quantity;
      totalPrice = totalPrice + itemTotal;
    }

    return totalPrice;
  };

  // BUNDLE EVERYTHING TO SHARE
  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
  };

  // Provide the cart data to all child components
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
