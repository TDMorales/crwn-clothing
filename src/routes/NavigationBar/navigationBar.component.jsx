import { React, Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown-logo.svg";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";

const NavigationBar = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo"></CrwnLogo>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="">
            CONTACT
          </Link>
          {currentUser ? (
            <Link className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </Link>
          ) : (
            <Link className="nav-link" to="auth">
              SIGN IN
            </Link>
          )}
          <CartIcon/>
          {isCartOpen && <CartDropdown /> }
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
