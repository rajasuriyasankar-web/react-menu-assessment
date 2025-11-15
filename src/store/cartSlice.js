import { createSelector, createSlice } from '@reduxjs/toolkit';
import { computeCartSummary } from '../utils/cart.js';

const initialState = {
  entries: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { item, categoryName, subcategoryName } = action.payload;
      const existingEntry = state.entries[item.id];
      const nextQuantity = existingEntry ? existingEntry.quantity + 1 : 1;

      state.entries[item.id] = {
        item: {
          ...item,
          category: categoryName,
          subcategory: subcategoryName,
        },
        quantity: nextQuantity,
      };
    },
    increaseItem: (state, action) => {
      const { itemId } = action.payload;
      const entry = state.entries[itemId];
      if (!entry) {
        return;
      }
      entry.quantity += 1;
    },
    decreaseItem: (state, action) => {
      const { itemId } = action.payload;
      const entry = state.entries[itemId];
      if (!entry) {
        return;
      }
      entry.quantity -= 1;
      if (entry.quantity <= 0) {
        delete state.entries[itemId];
      }
    },
    removeItem: (state, action) => {
      const { itemId } = action.payload;
      delete state.entries[itemId];
    },
    clearCart: (state) => {
      state.entries = {};
    },
  },
});

export const { addItem, increaseItem, decreaseItem, removeItem, clearCart } = cartSlice.actions;

const selectCartState = (state) => state.cart;

export const selectCartEntries = createSelector(selectCartState, (cart) => cart.entries);

export const selectCartSummary = createSelector(selectCartEntries, (entries) => computeCartSummary(entries));

export default cartSlice.reducer;

