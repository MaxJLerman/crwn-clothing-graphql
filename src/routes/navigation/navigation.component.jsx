import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

import { NavigationContainer, LogoContainer, NavigationLinks, NavigationLink } from './navigation.styles';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());
  
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavigationLinks>
          <NavigationLink to='/shop'>shop</NavigationLink>
          {
            currentUser
              ? ( <NavigationLink as="span" onClick={signOutUser}>sign out</NavigationLink> ) // previous span component changed to styled NavigationLink component but is still rendered as a span component
              : ( <NavigationLink to='/authentication'>sign in</NavigationLink> )
          }
          <CartIcon />
        </NavigationLinks>
        {
          isCartOpen && <CartDropdown /> // because && is a short circuit operator, CardDropdown element will only show when isCartOpen variable is true
        }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
