import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import {AiOutlineShoppingCart} from "@react-icons/all-files/ai/AiOutlineShoppingCart"
import "./navigation.styles.scss";
const Navigation = () => {
	return (
		<Fragment>
			<nav className='navigation'>
				<Link className='logo-container' to='/'>
					<CrownLogo className='logo' />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						shop
					</Link>
					<Link className='nav-link' to='/contact'>
						contact
					</Link>
					<Link className='nav-link' to='/sign-in'>
						sign in
					</Link>
					<Link className='nav-link' to='cart'>
						<AiOutlineShoppingCart className='logo' />
					</Link>
				</div>
			</nav>
			<Outlet />
		</Fragment>
	);
};
export default Navigation;
