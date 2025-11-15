import { formatCurrency } from '../utils/cart.js';

function CartSidebar({ summary, onIncrease, onDecrease, onRemove, onClear }) {
  const cartIsEmpty = summary.totalItems === 0;

  return (
    <aside className="cart card border-0 shadow-sm sticky-lg-top" style={{ top: '1.5rem' }}>
      <div className="card-header bg-white border-0 pb-0">
        <h2 className="h5 mb-0">Your Cart</h2>
      </div>
      <div className="card-body">
        {cartIsEmpty ? (
          <p className="text-muted mb-0">Your cart is empty. Add pizzas to unlock the Buy One, Get One Free deal!</p>
        ) : (
          <>
            <p className="small text-muted">
              Cart items: {summary.totalItems}
              {summary.pizzaCount > 0 && ` • Pizzas: ${summary.pizzaCount}`}
            </p>

            <div className="mb-3">
              <div className="small text-uppercase text-muted fw-semibold mb-2">Items</div>
              <ul className="list-group list-group-flush">
                {summary.itemSummaries.map((item) => (
                  <li key={item.id} className="list-group-item px-0 d-flex justify-content-between align-items-start">
                    <div>
                      <div className="fw-semibold d-flex align-items-center gap-2">
                        {item.label}
                        {item.isPizza && (
                          <span className="badge bg-success-subtle border border-success text-success">Pizza BOGO</span>
                        )}
                      </div>
                      <div className="small text-muted">
                        {item.category}
                        {item.subcategory ? ` • ${item.subcategory}` : ''}
                      </div>
                      <div className="small text-muted">{formatCurrency(item.unitPrice)} each</div>
                      <button
                        type="button"
                        className="btn btn-link btn-sm text-danger px-0 mt-1"
                        onClick={() => onRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="d-flex flex-column align-items-end gap-2">
                      <div className="btn-group btn-group-sm" role="group" aria-label={`Adjust quantity for ${item.label}`}>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => onDecrease(item.id)}>
                          -
                        </button>
                        <button type="button" className="btn btn-outline-secondary" disabled>
                          {item.quantity}
                        </button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => onIncrease(item.id)}>
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="small text-uppercase text-muted fw-semibold mb-2">Price breakdown</div>
            <ul className="list-group list-group-flush mb-3">
              {summary.lines.map((line) => (
                <li
                  key={line.key}
                  className={`list-group-item px-0 d-flex justify-content-between align-items-start ${
                    line.isFree ? 'bg-success-subtle' : ''
                  }`}
                >
                  <div>
                    <div className="fw-semibold">{line.label}</div>
                    <div className="small text-muted">
                      {line.quantity > 1 ? `Quantity: ${line.quantity}` : 'Quantity: 1'}
                    </div>
                    {line.note && (
                      <div className={`small ${line.isFree ? 'text-success' : 'text-primary'}`}>{line.note}</div>
                    )}
                  </div>
                  <div className={`fw-semibold ${line.isFree ? 'text-success' : 'text-dark'}`}>
                    {formatCurrency(line.amount)}
                  </div>
                </li>
              ))}
            </ul>

            {summary.pizzaSavings > 0 && (
              <div className="d-flex justify-content-between align-items-center text-success mb-2">
                <span className="fw-semibold">Pizza savings</span>
                <span className="fw-semibold">-{formatCurrency(summary.pizzaSavings)}</span>
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-semibold">Total due</span>
              <span className="fw-semibold text-primary fs-5">{formatCurrency(summary.total)}</span>
            </div>

            <button type="button" className="btn btn-outline-danger w-100" onClick={onClear}>
              Clear Cart
            </button>
          </>
        )}
      </div>
    </aside>
  );
}

export default CartSidebar;

