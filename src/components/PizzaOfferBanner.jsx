function PizzaOfferBanner() {
  return (
    <div className="pizza-offer alert alert-success shadow-sm mx-auto mb-4" role="alert">
      <div className="d-flex flex-column flex-md-row align-items-md-center gap-2 justify-content-center">
        <span className="badge bg-success text-uppercase fw-semibold">Pizza BOGO</span>
        <span>
          Add any two pizzas to your cart. The higher-priced pizza is charged and the other pizza is added for free.
        </span>
      </div>
    </div>
  );
}

export default PizzaOfferBanner;

