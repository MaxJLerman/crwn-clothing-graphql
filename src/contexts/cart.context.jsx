import { createContext, useReducer } from 'react';

import { SET_CART_ITEMS, SET_IS_CART_OPEN } from '../constants/cartActionTypes';

import { createAction } from '../utils/reducer/reducer.utils';

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

const cartReducer = (state, action) => {
  const { type, payload } = action;  

  switch(type) {
    case SET_CART_ITEMS:
      return {
          ...state,
          ...payload
      }

    case SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  };
};

export const CartProvider = ({ children }) => {
  // unused useState and useEffect
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() =>
  // {
  //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  //     setCartCount(newCartCount);
  // }, [cartItems]); // cartItems in the dependency array means useEffect runs whever the cartItems array changes

  // // make a new useEffect for each new responsibility
  // useEffect(() =>
  // { 
  //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
  //     setCartTotal(newCartTotal);
  // }, [cartItems]);

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

    dispatch(
      createAction(SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };
    
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => { 
    const newCartItems =  removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(
      createAction(SET_IS_CART_OPEN, bool)
    );
  };

  // moved the toggle function to the CartContext to gain access elsewhere in project
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen); // toggles the isCartOpen variable by setting it to the inverse of its current value0
  
  const value = { isCartOpen, setIsCartOpen, toggleIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
