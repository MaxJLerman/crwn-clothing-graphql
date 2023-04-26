import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from "../button/button.types";

import { ProductCardContaier, Footer, NameSpan, PriceSpan } from './product-card.styles';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  
  const { name, imageUrl, price } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
  
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
