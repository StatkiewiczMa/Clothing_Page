import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
// import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./navigation.styles.js";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import { useSelector } from "react-redux/es/hooks/useSelector";

const Navigation = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const { cartDropdownIfActive, setCartDropdownIfActive } =
    useContext(CartDropdownContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCartDropdownIfActive(null);
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/authentication">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {cartDropdownIfActive && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
