import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "../styles/sidebar.css";

const Sidebar = () => {
  const role = localStorage.getItem('role');

  return (
    <div className="sidebar">
      <h4>Home IQ</h4>
      <ul>
        <li>
          <HashLink smooth to="/#product">
            <span>Shop</span>
          </HashLink>
        </li>
        <li>
          <Link to="/cart">
            <span>Cart</span>
          </Link>
        </li>
        <li>
          <Link to="/review">
            <span>Reviews</span>
          </Link>
        </li>
        <li>
          <Link to="/trending">
            <span>Trending</span>
          </Link>
        </li>
        {role === 'manager' && 
        <>
          <li>
            <Link to="/inventoryPage">
              <span>Inventory</span>
            </Link>
          </li>
          <li>
            <Link to="/salesPage">
              <span>Sales Report</span>
            </Link>
          </li>
        </>
        }
        <li>
          <Link to="/features">
            <span>Features</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
