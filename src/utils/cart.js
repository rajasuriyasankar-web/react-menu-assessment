const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (value) => currencyFormatter.format(value);

export const computeCartSummary = (cartEntries) => {
  const lines = [];
  const itemSummaries = [];
  let total = 0;
  let pizzaCount = 0;
  let totalItems = 0;
  let pizzaSavings = 0;

  const pizzaItems = [];

  Object.values(cartEntries).forEach(({ item, quantity }) => {
    if (!item || !quantity) {
      return;
    }

    totalItems += quantity;
    itemSummaries.push({
      id: item.id,
      label: item.name,
      quantity,
      unitPrice: item.price,
      category: item.category,
      subcategory: item.subcategory,
      isPizza: item.category === 'Pizza',
    });

    if (item.category === 'Pizza') {
      pizzaCount += quantity;
      for (let i = 0; i < quantity; i += 1) {
        pizzaItems.push(item);
      }
    } else {
      const lineTotal = item.price * quantity;
      total += lineTotal;
      lines.push({
        key: `${item.id}-paid`,
        label: item.name,
        quantity,
        amount: lineTotal,
        note: quantity > 1 ? 'Includes multiple items' : '',
        isFree: false,
      });
    }
  });

  pizzaItems.sort((a, b) => b.price - a.price);

  for (let index = 0; index < pizzaItems.length; index += 2) {
    const paidItem = pizzaItems[index];

    if (!paidItem) {
      break;
    }

    total += paidItem.price;
    lines.push({
      key: `${paidItem.id}-paid-${index}`,
      label: paidItem.name,
      quantity: 1,
      amount: paidItem.price,
      note: 'Pizza BOGO',
      isFree: false,
    });

    const freeItem = pizzaItems[index + 1];

    if (freeItem) {
      lines.push({
        key: `${freeItem.id}-free-${index}`,
        label: freeItem.name,
        quantity: 1,
        amount: 0,
        note: 'Free (Pizza BOGO)',
        isFree: true,
      });
      pizzaSavings += freeItem.price;
    }
  }

  return {
    lines,
    itemSummaries,
    total,
    pizzaCount,
    totalItems,
    pizzaSavings,
  };
};

