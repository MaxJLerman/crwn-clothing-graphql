import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import './navigation.styles.scss';

const Navigation = () =>
{
    const { currentUser, setCurrentUser } = useContext(UserContext);

    // const signOutHandler = async () =>
    // {
    //     await signOutUser();
    //     setCurrentUser(null);
    // }
    
    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>
                <div className="navigation-links-container">
                    <Link className="navigation-link" to='/shop'>
                        shop
                    </Link>
                    {
                        currentUser ? (
                            <span className="navigation-link" onClick={signOutUser}>sign out</span>
                        ) : (
                            <Link className="navigation-link" to='/authentication'>sign in</Link>
                        )
                    }
                    <CartIcon />
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;