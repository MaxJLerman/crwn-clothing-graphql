import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from "../../components/spinner/spinner.component";
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import { CategoryContainer, Title } from './category.styles';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap); // selectCategoriesMap is memoized, meaning the useSelector method works
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  // category & categoriesMap in the dependency array means useEffect runs whenever the either the category or categoriesMap elements change

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {
        isLoading
          ? <Spinner />
          : <CategoryContainer>
              {
                  // only renders the products onto the screen if products has a value
                  products && products.map((product) => <ProductCard key={product.id} product={product} />)
              }
            </CategoryContainer>
      }
    </Fragment>
  );
};

export default Category;
