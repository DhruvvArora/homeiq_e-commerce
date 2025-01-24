import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faUserPlus, 
  faShoppingCart, 
  faHeadset, 
  faStar 
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-text">Home IQ</span>
      </Link>
      <SearchBar />
      <div className="navbar-buttons">
        <Link to="/login" className="nav-link">
          <FontAwesomeIcon icon={faUser} />
          <span>Login</span>
        </Link>
        <Link to="/register" className="nav-link">
          <FontAwesomeIcon icon={faUserPlus} />
          <span>Register</span>
        </Link>
        <Link to="/cart" className="nav-link cart-link">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>Cart</span>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </Link>
        <Link to="/customerService" className="nav-link">
          <FontAwesomeIcon icon={faHeadset} />
          <span>Support</span>
        </Link>
        <Link to="/features" className="nav-link">
          <FontAwesomeIcon icon={faStar} />
          <span>Features</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
