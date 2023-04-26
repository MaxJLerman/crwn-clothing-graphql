import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
  // the following useEffect only needs to be run once per categories collection updating
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA, "title");
  // }, []);
  
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
