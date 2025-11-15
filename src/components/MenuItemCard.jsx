import { formatCurrency } from '../utils/cart.js';

function MenuItemCard({ item, onAdd }) {
  return (
    <article className="card menu-card h-100 border-0 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h4 className="h6 fw-semibold mb-0">{item.name}</h4>
          <span className="text-primary fw-semibold">{formatCurrency(item.price)}</span>
        </div>
        {item.description && <p className="text-muted small flex-grow-1">{item.description}</p>}
        <button type="button" className="btn btn-outline-primary mt-3" onClick={onAdd}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default MenuItemCard;

