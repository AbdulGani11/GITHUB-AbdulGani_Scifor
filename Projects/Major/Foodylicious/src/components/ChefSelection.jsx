// ChefSelection: Displays chef's special dishes in a table format.
// Usage: Parent component: <Home /> - "Chef's Selection" section

import SectionHeader from "./ui/SectionHeader";

function ChefSelection() {
  // Static "array of objects" representing chef's special dishes (6-hardcoded data)
  const dishes = [
    {
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&q=80",
      name: "Grilled Salmon Supreme",
      ingredients: "Atlantic salmon, lemon butter, asparagus",
      price: "$24.99",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1694850980219-e5ed247af66a?q=80&w=796&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Truffle Risotto",
      ingredients: "Arborio rice, black truffle, porcini mushrooms",
      price: "$22.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?w=200&q=80",
      name: "Filet Mignon",
      ingredients: "Beef tenderloin, red wine reduction",
      price: "$32.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&q=80",
      name: "Lobster Linguine",
      ingredients: "Fresh lobster tail, garlic cream sauce",
      price: "$28.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=200&q=80",
      name: "Duck Confit",
      ingredients: "Slow-cooked duck leg, orange glaze",
      price: "$26.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=200&q=80",
      name: "Seafood Paella",
      ingredients: "Shrimp, mussels, squid, saffron rice",
      price: "$25.99",
    },
  ];

  return (
    <section
      id="chefs-selection"
      className="full-height d-flex flex-column justify-content-center py-5 py-lg-6 bg-light"
    >
      <div className="container px-4 px-lg-5">
        <SectionHeader
          title="Chef's Selection"
          subtitle="Handpicked specialties for the discerning palate"
        />

        {/* Table Container */}
        <div className="p-4 p-md-5 rounded-4 bg-white shadow-sm">
          {/* table-responsive */}
          <div className="table-responsive">
            {/* table-hover */}
            <table className="special-table table table-hover align-middle w-100">
              {/* Table Header */}
              <thead>
                <tr>
                  <th scope="col" style={{ width: "80px" }}>
                    Image
                  </th>
                  <th scope="col">Dish</th>
                  <th scope="col">Ingredients</th>
                  <th scope="col" className="text-end">
                    Price
                  </th>
                </tr>
              </thead>

              {/* Table Body */}

              <tbody>
                {dishes.map((dish, index) => (
                  // .map() loops through the dishes "array of objects": 1st param is the current item, 2nd param is its index number
                  // React needs a key to track items; using 'index' is safe here because this list or array is static and never reorders.
                  <tr key={index}>
                    <td>
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="rounded-circle object-fit-cover"
                        width="60"
                        height="60"
                      />
                    </td>
                    <td className="fw-medium">{dish.name}</td>
                    <td className="text-muted fw-light small">
                      {dish.ingredients}
                    </td>
                    <td className="text-end font-serif fw-lighter fs-5">
                      {dish.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChefSelection;
