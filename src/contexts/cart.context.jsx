import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) =>
{
    // checks if the cartItems array already contains the productToAdd by searching through the existing cart items' IDs for the matching ID of productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // if existing cart item is found
    if (existingCartItem)
    {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1} // returns a new cartItem object with all the old object's properties, except the quantity is incremented
            : cartItem
        );
    }
    
    // create a new array with all existing cart items, plus the new cart item that the ID doesn't match any of the other cart items
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [],
        addItemToCart: () => {},
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
    
    const addItemToCart = (productToAdd) =>
    {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}