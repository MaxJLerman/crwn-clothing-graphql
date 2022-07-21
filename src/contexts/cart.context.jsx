import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) =>
{
    // checks if the cartItems array already contains the productToAdd by searching through the existing cart items' IDs for the matching ID of productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // if existing cart item is found
    if (existingCartItem)
    {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 } // returns a new cartItem object with all the old object's properties, except the quantity is incremented
            : cartItem // if the cart item doesn't match the ID I'm looking for, leave it alone 
        ); // returning a NEW object ensures React will re-render the checkout page therefore updating the object property on the screen as if just the property of an object changes, React won't re-render the page
    }
    
    // create a new array with all existing cart items, plus the new cart item that the ID doesn't match any of the other cart items
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) =>
{
    // finds the cartItemToRemove from the array of cartItems in the cart
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    // check if quantity of cartItemToRemove is 1, if so return new array with cartItemToRemove filtered out
    if (existingCartItem.quantity === 1)
    {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id); // this filter() command keeps the cartItems with IDs that don't match the ID of the cartItemToRemove
    }

    // if existingCartItem has a quantity > 1, returns a new array with all existing cart items, plus the cart item of matching ID with a decremented quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 } // returns a new cartItem object with all the old object's properties, except the quantity is incremented
        : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [],
        addItemToCart: () => {},
        removeItemFromCart: () => {},
        clearItemFromCart: () => {},
        cartCount: 0
    }
);

export const CartProvider = ({ children }) =>
{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() =>
    {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]) // cartItems in the dependency array means useEffect runs whever the cartItems array changes

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen); // toggles the isCartOpen variable by setting it to the inverse of its current value
    
    const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));

    const removeItemFromCart = (cartItemToRemove) => setCartItems(removeCartItem(cartItems, cartItemToRemove));

    const clearItemFromCart = (cartItemToClear) => setCartItems(clearCartItem(cartItems, cartItemToClear));
    
    const value = { isCartOpen, setIsCartOpen, toggleIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}