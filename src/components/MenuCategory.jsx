import MenuItemCard from './MenuItemCard.jsx';

function MenuCategory({ category, onAdd }) {
  return (
    <section className="menu-category card border-0 shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
          <div>
            <h2 className="h4 mb-2">{category.name}</h2>
            {category.description && <p className="text-muted mb-0 category-description">{category.description}</p>}
          </div>
          {category.name === 'Pizza' && (
            <span className="badge bg-success-subtle border border-success text-success fw-semibold px-3 py-2">
              Buy One, Get One Free
            </span>
          )}
        </div>

        {category.subcategories.map((subcategory) => (
          <div key={subcategory.name} className="mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h3 className="h5 mb-0">{subcategory.name}</h3>
              <span className="small text-muted">
                {subcategory.items.length} item{subcategory.items.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="row g-3 row-cols-1 row-cols-md-2">
              {subcategory.items.map((item) => (
                <div key={item.id} className="col">
                  <MenuItemCard item={item} onAdd={() => onAdd(item, category.name, subcategory.name)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MenuCategory;

