import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from "../button/button.types";
import { ProductCardContaier, Footer, NameSpan, PriceSpan } from './product-card.styles';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { name, imageUrl, price } = product;

  const addProductToCart = () => addItemToCart(product);
  
  return (
    <ProductCardContaier>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <NameSpan>{name}</NameSpan>
        <PriceSpan>{price}</PriceSpan>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.INVERTED_BUTTON} onClick={addProductToCart}>Add to cart</Button>
    </ProductCardContaier>
  );
};

export default ProductCard;
