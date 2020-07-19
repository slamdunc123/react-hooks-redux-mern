import React, { useState } from 'react';

// styles
import './Navbar.scss';

// routing
import { NavLink } from 'react-router-dom';

// partials
import Brand from '../Brand/Brand';

const Navbar = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
	const [burgerIcon, setBurgerIcon] = useState(false);

	// toggle burger menu when clicked
	const toggleBurgerMenu = () => {
		setIsBurgerMenuOpen(!isBurgerMenuOpen);
		setBurgerIcon(!burgerIcon);
	};

	// close burger menu when menu link is clicked
	const closeBurgerMenu = () => {
		if (isBurgerMenuOpen) {
			toggleBurgerMenu();
		}
	};

	return (
		<div className='nav-container'>
			<Brand />
			{/* navigation menu */}
			<div className='nav-menu'>
				<NavLink className='nav-link' exact to='/'>
					Home
				</NavLink>
				<NavLink className='nav-link' exact to='/items'>
					Items
				</NavLink>
			</div>
			<div className={`nav-burger ${burgerIcon ? 'opened' : ''}`}>
				{burgerIcon ? (
					<i
						className={'fas fa-times'}
						onClick={toggleBurgerMenu}
					></i>
				) : (
					<i className={'fas fa-bars'} onClick={toggleBurgerMenu}></i>
				)}
			</div>
			{/* navigation mobile menu  */}
			<div
				className={`nav-mobile-menu ${
					isBurgerMenuOpen ? 'opened' : ''
				}`}
			>
				<NavLink
					className='nav-link'
					onClick={closeBurgerMenu}
					exact
					to='/'
				>
					Home
				</NavLink>
				<NavLink
					className='nav-link'
					onClick={closeBurgerMenu}
					exact
					to='/items'
				>
					Items
				</NavLink>
			</div>
		</div>
	);
};

export default Navbar;
