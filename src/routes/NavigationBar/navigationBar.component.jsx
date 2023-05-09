import { React, Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown-logo.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import "./navigation.styles.scss";

const NavigationBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  // console.log(currentUser)

  const signOutHandler = async () => {
    await signOutUser()
    setCurrentUser(null)
  }
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
          {currentUser ? <Link className="nav-link" onClick={signOutHandler}>
            SIGN OUT
          </Link> :
            <Link className="nav-link" to="auth">
              SIGN IN
            </Link>}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
