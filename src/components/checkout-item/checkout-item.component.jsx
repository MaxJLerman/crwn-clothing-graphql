import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action";
import { CheckoutItemContainer, ImageContainer, DefaultSpan, QuantitySpan, Arrow, ValueSpan, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

  return(
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <DefaultSpan>{name}</DefaultSpan>
      <QuantitySpan>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <ValueSpan>{quantity}</ValueSpan>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </QuantitySpan>
      <DefaultSpan>{price}</DefaultSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
