import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

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
      <Button buttonType={BUTTON_TYPE_CLASSES.default} onClick={goToCheckoutHandler}>Go To Checkout</Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;
