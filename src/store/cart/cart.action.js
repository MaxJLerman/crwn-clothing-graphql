import * as t from "./cart.types"
import { createAction } from "../../utils/reducer/reducer.utils"

const addCartItem = (cartItems, productToAdd) => {
  // checks if the cartItems array already contains the productToAdd by searching through the existing cart items' IDs for the matching ID of productToAdd
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  // if existing cart item is found
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 } // returns a new cartItem object with all the old object's properties, except the quantity is incremented
      : cartItem // if the cart item doesn't match the ID I'm looking for, leave it alone 
    )}; // returning a NEW object ensures React will re-render the checkout page therefore updating the object property on the screen as if just the property of an object changes, React won't re-render the page

  // create a new array with all existing cart items, plus the new cart item that the ID doesn't match any of the other cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // finds the cartItemToRemove from the array of cartItems in the cart
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  // check if quantity of cartItemToRemove is 1, if so return new array with cartItemToRemove filtered out
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id); // this filter() command keeps the cartItems with IDs that don't match the ID of the cartItemToRemove
  }

  // if existingCartItem has a quantity > 1, returns a new array with all existing cart items, plus the cart item of matching ID with a decremented quantity
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 } // returns a new cartItem object with all the old object's properties, except the quantity is incremented
    : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);


export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(t.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => { 
  const newCartItems =  removeCartItem(cartItems, cartItemToRemove);
  return createAction(t.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(t.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) => createAction(t.SET_IS_CART_OPEN, boolean);
