import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
  const navigate = useNavigate();
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  const goToCheckoutHandler = () => {
    toggleIsCartOpen();
    navigate('/checkout');
  };
    
  return(
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length // no need for "< 1" because if 0, will return false
            ? ( cartItems.map(item => <CartItem key={item.id} cartItem={item} />) )
            : ( <EmptyMessage>Your cart is empty</EmptyMessage> )
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
