import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import menuData from './data/menu.json';
import PizzaOfferBanner from './components/PizzaOfferBanner.jsx';
import CategoryFilters from './components/CategoryFilters.jsx';
import MenuCategory from './components/MenuCategory.jsx';
import CartSidebar from './components/CartSidebar.jsx';
import {
  addItem,
  increaseItem,
  decreaseItem,
  removeItem,
  clearCart,
  selectCartSummary,
} from './store/cartSlice.js';

const DEFAULT_CATEGORY = 'All';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const dispatch = useDispatch();
  const summary = useSelector(selectCartSummary);

  const categoryOptions = useMemo(
    () => [DEFAULT_CATEGORY, ...menuData.categories.map((category) => category.name)],
    [],
  );

  const filteredCategories = useMemo(() => {
    if (selectedCategory === DEFAULT_CATEGORY) {
      return menuData.categories;
    }
    return menuData.categories.filter((category) => category.name === selectedCategory);
  }, [selectedCategory]);

  const handleAddItem = useCallback(
    (item, categoryName, subcategoryName) => {
      dispatch(addItem({ item, categoryName, subcategoryName }));
    },
    [dispatch],
  );

  const handleIncreaseItem = useCallback(
    (itemId) => {
      dispatch(increaseItem({ itemId }));
    },
    [dispatch],
  );

  const handleDecreaseItem = useCallback(
    (itemId) => {
      dispatch(decreaseItem({ itemId }));
    },
    [dispatch],
  );

  const handleRemoveItem = useCallback(
    (itemId) => {
      dispatch(removeItem({ itemId }));
    },
    [dispatch],
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="menu-page bg-body-tertiary min-vh-100">
      <main className="container py-5">
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-3">Build Your Meal</h1>
          <p className="lead text-muted mx-auto mb-4 menu-intro">
            Browse the categories, add dishes you love, and track your basket in real time. Pizza orders automatically
            unlock a Buy One, Get One Free deal: the higher-priced pizza is charged and the other pizza is added for
            free.
          </p>
          <PizzaOfferBanner />
        </header>

        <CategoryFilters
          categories={categoryOptions}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="row gy-4">
          <div className="col-lg-8">
            {filteredCategories.map((category) => (
              <MenuCategory key={category.name} category={category} onAdd={handleAddItem} />
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center text-muted py-5">
                <p className="mb-1">No items match this filter right now.</p>
                <button type="button" className="btn btn-link" onClick={() => setSelectedCategory(DEFAULT_CATEGORY)}>
                  Reset filters
                </button>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <CartSidebar
              summary={summary}
              onIncrease={handleIncreaseItem}
              onDecrease={handleDecreaseItem}
              onRemove={handleRemoveItem}
              onClear={handleClearCart}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
