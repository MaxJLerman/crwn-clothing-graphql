import { useState, createContext, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.jsx';
// import { CATEGORIES, TITLE } from '../constants/constants.js';
// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext(
    {
        categoriesMap: {},
    });

export const CategoriesProvider = ({ children }) =>
{
    // eslint-disable-next-line no-unused-vars
    const [categoriesMap, setCategoriesMap] = useState({});
    
    useEffect(() =>
    {
        const getCategoriesMap = async () =>
        {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        
        getCategoriesMap();
    }, []);
    
    // only run this command ONCE to batch write all the products to the firestore database, so I've left it commented out for reference
    // useEffect(() =>
    // {
    //     addCollectionAndDocuments(CATEGORIES, SHOP_DATA, TITLE);
    // }, []);

    const value = { categoriesMap };
        
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}