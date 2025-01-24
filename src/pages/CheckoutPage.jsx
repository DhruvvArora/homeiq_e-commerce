import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import "../App.css";

const FCart = () => {
  return (
      <div className="App">
        <Navbar />
        <Sidebar />
        <Cart />
        <Checkout />
      </div>    
  );
};

export default FCart;