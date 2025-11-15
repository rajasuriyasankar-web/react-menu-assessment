function CategoryFilters({ categories, selected, onSelect }) {
  return (
    <nav className="category-filters d-flex flex-wrap justify-content-center gap-2 mb-4">
      {categories.map((category) => {
        const isActive = selected === category;
        return (
          <button
            key={category}
            type="button"
            className={`btn btn-sm px-3 py-2 rounded-pill ${
              isActive ? 'btn-primary shadow-sm' : 'btn-outline-primary'
            }`}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}

export default CategoryFilters;

