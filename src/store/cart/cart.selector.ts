import { createSelector } from "reselect";

import { RootState } from "../store";
import { CartState } from "./cart.reducer";

const selectCartReducer = (state: RootState): CartState => {
  return state.cart;
};

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItemsSlice) => cartItemsSlice.reduce((total, cartItem) => total + cartItem.quantity, 0)
);


export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItemsSlice) => cartItemsSlice.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
);
