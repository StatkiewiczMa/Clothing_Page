import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import "./navigation.styles.scss";

import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	// console.log(currentUser);

	const signOutHandler = async () => {
		await signOutUser();
		setCurrentUser(null);
	};

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
					{currentUser ? (
						<span className='nav-link' onClick={signOutHandler}>
							sign out
						</span>
					) : (
						<Link className='nav-link' to='/authentication'>
							sign in
						</Link>
					)}
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
