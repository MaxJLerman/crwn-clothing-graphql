import { createSelector } from "reselect";

const selectCartReducer = (state) => {
  return state.cart;
};

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSegment) => cartSegment.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSegment) => cartSegment.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItemsSegment) => cartItemsSegment.reduce((total, cartItem) => total + cartItem.quantity, 0)
);


export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItemsSegment) => cartItemsSegment.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
);
