import { useState, createContext, useEffect } from 'react';

import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.jsx';
// import { CATEGORIES, TITLE } from '../constants/constants.js';
// import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext(
    {
        products: [],
    });

export const ProductsProvider = ({ children }) =>
{
    // eslint-disable-next-line no-unused-vars
    const [products, setProducts] = useState([]);
    const value = { products };

    // only run this command ONCE to batch write all the products to the firestore database, so I've left it commented out for reference
    // useEffect(() =>
    // {
    //     addCollectionAndDocuments(CATEGORIES, SHOP_DATA, TITLE);
    // }, []);
    
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}