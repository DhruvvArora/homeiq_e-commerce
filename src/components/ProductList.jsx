import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";
import "../styles/productList.css";

const ProductList = ({ products, category }) => {
  const { addToCart } = useCart(); 
  const [successMessage, setSuccessMessage] = useState(""); 

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const handleAddToCart = (product) => {
    addToCart(product);
    setSuccessMessage(`${product.name} has been added to your cart!`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="product-grid">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="price">${product.price}</div>
          <div className="buttons">
            <button>Buy Now</button>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  category: PropTypes.string.isRequired,
};

export default ProductList;
