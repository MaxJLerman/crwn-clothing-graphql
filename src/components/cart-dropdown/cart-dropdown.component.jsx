import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';

const CartDropdown = () =>
{
    const { cartItems, toggleIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => 
    {
        toggleIsCartOpen();
        navigate('/checkout');
    }
    
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