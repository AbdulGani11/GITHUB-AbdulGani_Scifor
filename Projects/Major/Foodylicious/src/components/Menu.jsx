// Menu: Displays featured dishes in a bento grid layout
// Parent component: <Home /> - "Our Special Menu" section

import SectionHeader from './ui/SectionHeader';

function Menu() {
  // Static array of menu items for display (hardcoded data)
  const menuItems = [
    {
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      title: 'Gourmet Salad',
      price: '$12.99'
    },
    {
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
      title: 'Margherita Pizza',
      price: '$15.99'
    },
    {
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
      title: 'Pancake Stack',
      price: '$9.99'
    },
    {
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
      title: 'Fresh Fruit Bowl',
      price: '$8.99'
    },
    {
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80',
      title: 'Classic Burger',
      price: '$13.99'
    },
    {
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80',
      title: 'Creamy Pasta',
      price: '$14.99'
    },
    {
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
      title: 'Avocado Toast',
      price: '$10.99'
    },
    {
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      title: 'Chocolate Cake',
      price: '$7.99'
    }
  ];

  return (
    <section id="menu" className="full-height d-flex flex-column justify-content-center py-5 py-lg-6 bg-white">
      <div className="container px-4 px-lg-5">
        <SectionHeader
          title="Our Special Menu"
          subtitle="Handcrafted dishes made with fresh ingredients"
        />

        {/* Bento Grid */}
        <div className="bento-grid">
          {menuItems.map((item, index) => (
            <div className="bento-card" key={index}>
              <img
                src={item.image}
                alt={item.title}
                className="bento-card-image"
              />
              {/* Content Overlay */}
              <div className="bento-card-content">
                <h3 className="bento-card-title">{item.title}</h3>
                <p className="bento-card-price font-serif">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;
