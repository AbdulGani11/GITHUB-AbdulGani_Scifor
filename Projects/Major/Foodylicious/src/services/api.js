// TheMealDB API Service (free, no key required)
// Note: The API gives us food "categories" (Beef, Chicken, etc.), We transform these into fake "restaurants" for our app's UI

// Exported Functions: fetchRestaurants, fetchMenuByCategory, fetchMealDetails


// Base URL for all API calls
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// ════════════════════════════════════════════════════════════════════════════
// LOOKUP TABLES (like a dictionary - look up a key, get a value)
// ════════════════════════════════════════════════════════════════════════════

// Category → Restaurant Image
const restaurantImages = {
  'Beef': 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
  'Chicken': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  'Dessert': 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&q=80',
  'Lamb': 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80',
  'Miscellaneous': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  'Pasta': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
  'Pork': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
  'Seafood': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
  'Side': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80',
  'Starter': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
  'Vegan': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
  'Vegetarian': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80',
  'Breakfast': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
  'Goat': 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80'
};

// Category → Restaurant Name
const categoryToRestaurantName = {
  'Beef': 'The Steakhouse',
  'Chicken': 'Golden Grill',
  'Dessert': 'Sweet Treats Bakery',
  'Lamb': 'Spice Garden',
  'Miscellaneous': 'The Fusion Kitchen',
  'Pasta': 'The Italian Kitchen',
  'Pork': 'Dragon Palace',
  'Seafood': 'Ocean Fresh',
  'Side': 'Green Garden',
  'Starter': 'Appetizer House',
  'Vegan': 'Vegan Vibes',
  'Vegetarian': 'Veggie Delight',
  'Breakfast': 'Morning Cafe',
  'Goat': 'Mediterranean Grill'
};

// Badges for restaurant cards (some are null = no badge)
const availableBadges = [
  { text: 'Most Visited', color: '#e74c3c' },
  { text: 'Popular', color: '#9b59b6' },
  { text: 'Trending', color: '#3498db' },
  { text: 'Top Rated', color: '#f39c12' },
  { text: 'New', color: '#27ae60' },
  null,
  null,
  null
];






// ════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════

// Generate a fake price from meal ID (same meal = same price every time)
const generatePrice = (mealId) => {
  const mealIdNumber = parseInt(mealId);   // "12345" → 12345
  const remainder = mealIdNumber % 15;     // Get remainder 0-14
  const basePrice = remainder + 8;         // Range: 8-22
  const finalPrice = basePrice + 0.99;     // Add cents: $8.99-$22.99
  return finalPrice;
};

// Get restaurant name from category (with fallback)
const getRestaurantName = (categoryName) => {
  const name = categoryToRestaurantName[categoryName];
  if (name) {
    return name;
  } else {
    return categoryName + ' House';  // Fallback: "Beef House"
  }
};

// Get restaurant image from category (with fallback)
const getRestaurantImage = (categoryName, defaultImage) => {
  const image = restaurantImages[categoryName];
  if (image) {
    return image;
  } else {
    return defaultImage;  // Use API's default image
  }
};

// Get badge for a restaurant based on its index/position
const getBadge = (index) => {
  // If index is 0 & list length is 8: 0 % 8 = 0. (It loops back to start)
  const badgeIndex = index % availableBadges.length;

  // Returns the item at position 0 (e.g., "Most Visited")
  return availableBadges[badgeIndex];
};

// Generate delivery time based on index/position
const getDeliveryTime = (index) => {
  // If index is 0: (0 * 5) = 0. Then 0 % 20 = 0. Result: 15 + 0 = 15
  const minTime = 15 + (index * 5) % 20;

  // If index is 0: (0 * 5) = 0. Then 0 % 20 = 0. Result: 25 + 0 = 25
  const maxTime = 25 + (index * 5) % 20;

  return minTime + '-' + maxTime + ' min'; // Returns "15-25 min"
};

// Generate random rating between 4.0 and 4.9
const generateRating = () => {
  const rating = 4 + Math.random() * 0.9;
  return rating.toFixed(1);  // "4.7"
};

// Function to cut long text and add "..." at the end
const shortenText = (text, maxLength) => {

  // Step 1: Safety Check
  // If text is empty or null, return nothing (avoid crashing)
  if (!text) {
    return '';
  }

  // Step 2: Cut the text
  // Start at character 0 and stop at maxLength (e.g., 80 chars)
  const shortened = text.substring(0, maxLength);

  // Step 3: Add dots and return
  return shortened + '...';
};




// ════════════════════════════════════════════════════════════════════════════
// FETCH RESTAURANTS
// ════════════════════════════════════════════════════════════════════════════
export const fetchRestaurants = async () => {
  try {
    // Step 1: Make API request
    const response = await fetch(BASE_URL + '/categories.php');

    // Step 2: Check if request failed
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }

    // Step 3: Convert response to JavaScript object
    const data = await response.json();

    // Step 4: Check if we got categories
    if (!data.categories) {
      throw new Error('No restaurants found');
    }

    // Step 5: Transform each category into a restaurant
    const restaurants = [];

    for (let index = 0; index < data.categories.length; index++) {
      const category = data.categories[index];
      const badge = getBadge(index);

      // Build restaurant object step by step
      const restaurant = {
        id: index + 1,
        name: getRestaurantName(category.strCategory),
        image: getRestaurantImage(category.strCategory, category.strCategoryThumb),
        cuisine: category.strCategory,
        rating: generateRating(),
        deliveryTime: getDeliveryTime(index),
        badge: badge ? badge.text : null,
        badgeColor: badge ? badge.color : null,
        description: shortenText(category.strCategoryDescription, 80),
        category: category.strCategory
      };

      restaurants.push(restaurant);
    }

    // Step 6: Add one custom restaurant
    const sushiRestaurant = {
      id: restaurants.length + 1,
      name: 'Sushi Master',
      image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80',
      cuisine: 'Seafood',
      rating: '4.9',
      deliveryTime: '30-40 min',
      badge: 'Premium',
      badgeColor: '#8e44ad',
      description: 'Premium Japanese sushi and seafood specialties...',
      category: 'Seafood'
    };
    restaurants.push(sushiRestaurant);

    return restaurants;

  } catch (error) {
    throw new Error(error.message || 'Failed to fetch restaurants');
  }
};




// ════════════════════════════════════════════════════════════════════════════
// FETCH MENU BY CATEGORY
// ════════════════════════════════════════════════════════════════════════════
export const fetchMenuByCategory = async (category, restaurantName) => {
  // Guard: Stop if no category provided
  if (!category) {
    throw new Error('Category not found');
  }

  try {
    // Step 1: Make API request
    const url = `${BASE_URL}/filter.php?c=${category}`;
    const response = await fetch(url);

    // Step 2: Check if request failed
    if (!response.ok) {
      throw new Error('Failed to fetch menu');
    }

    // Step 3: Convert response to JSON
    const data = await response.json();

    // Step 4: Check if we got meals
    if (!data.meals) {
      throw new Error('No meals found');
    }

    // Step 5: Take first 9 meals and transform them. 
    // Limit the list to the first 9 meals only (indices 0 to 9)
    const first9Meals = data.meals.slice(0, 9);

    // Starting with an empty list to store the formatted menu items
    const menuItems = [];

    for (const meal of first9Meals) {
      const menuItem = {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        price: generatePrice(meal.idMeal),
        category: category
      };
      menuItems.push(menuItem);
    }

    // Step 6: Build and return result
    let finalRestaurantName = restaurantName;
    if (!finalRestaurantName) {
      finalRestaurantName = getRestaurantName(category);
    }

    const result = {
      restaurantName: finalRestaurantName,
      category: category,
      items: menuItems
    };

    return result;

  } catch (error) {
    throw new Error(error.message || 'Failed to fetch menu');
  }
};





// ════════════════════════════════════════════════════════════════════════════
// FETCH MEAL DETAILS
// ════════════════════════════════════════════════════════════════════════════
export const fetchMealDetails = async (mealId) => {
  try {
    // Step 1: Make API request
    const url = `${BASE_URL}/lookup.php?i=${mealId}`;
    const response = await fetch(url);

    // Step 2: Check if request failed
    if (!response.ok) {
      throw new Error('Failed to fetch meal details');
    }

    // Step 3: Convert response to JavaScript object (JSON)
    const data = await response.json();

    // Step 4: Check if we got meal data
    const hasMeals = data.meals && data.meals[0];
    if (!hasMeals) {
      throw new Error('Meal not found');
    }

    // Step 5: Extract the meal (API returns array with 1 item)
    const mealData = data.meals[0];

    // Step 6: Build and return result
    const result = {
      id: mealData.idMeal,
      name: mealData.strMeal,
      description: shortenText(mealData.strInstructions, 100),
      image: mealData.strMealThumb,
      category: mealData.strCategory,
      area: mealData.strArea,
      price: generatePrice(mealData.idMeal)
    };

    return result;

  } catch (error) {
    throw new Error(error.message || 'Failed to fetch meal details');
  }
};
