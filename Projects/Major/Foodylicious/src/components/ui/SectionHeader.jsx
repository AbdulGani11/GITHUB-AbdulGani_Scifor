// SectionHeader: Reusable component displaying a title, subtitle, and divider line

// Props = data passed into this component (like function arguments)

// Parent components:
//   - <Restaurants /> uses this for "Our Restaurants" section title
//   - <MenuPage /> uses this for restaurant menu section title
//   - <Menu /> uses this for "Our Special Menu" section on home page
//   - <ChefSelection /> uses this for "Chef's Selection" section on home page
//   - <Contact /> uses this for "Get in Touch" section

function SectionHeader({ title, subtitle, showDivider = true }) {
  return (
    // Conditional Rendering: `subtitle` and `showDivider` are checked independently; if true, their respective HTML is rendered.
    <div className="section-header">
      <h2 className="section-title font-serif">{title}</h2>

      {subtitle && <p className="fs-5 fw-light text-secondary">{subtitle}</p>}

      {showDivider && (
        <hr className="mx-auto opacity-25 text-secondary my-3 w-50" />
      )}
    </div>
  );
}

export default SectionHeader;
