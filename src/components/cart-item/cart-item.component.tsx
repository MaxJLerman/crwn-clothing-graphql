import { FC } from 'react';

import { CartItem as CartItemType } from '../../store/cart/cart.types'; // removes duplicate declaration of CartItem error
import { CartItemContainer, ItemDetails } from './cart-item.styles';

type CartItemProps = {
  cartItem: CartItemType,
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>{quantity} x £{price}</span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
