import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "../styles/Recommendations.css";

const Recommendations = () => {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5001/products", { query, });
      console.log('Response data:', response.data);
      setResults(response.data); 
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleAddToCart = (product) => {
    const imageMapping = {
      "Smart Goggles": "sgoggles.jpg",
      "Smart Watch": "swatch1.webp",
      "Smart Thermostat": "thermostat.jpeg",
      "Smart Speaker": "sspeaker.jpg",
      "Smart Lighting": "slighting.jpeg",
      "Smart Doorlock": "sdoorlock.jpg",
      "Smart Curtains": "scurtains.jpg",
      "Smart Robot Vacuum": "svacuum.jpg",
      "Smart Mirror": "smirror.webp",
      "Smart Garage Controller": "scontroller.jpeg",
      "Smart Pet Feeder": "sfeeder.webp",
      "Smart Air Purifier": "spurifier.jpeg"
    };

    const cartProduct = {
      id: Date.now(),
      name: product.product_name,
      price: product.product_price,
      description: product.description,
      category: product.category,
      image: imageMapping[product.product_name] || "/default-product-image.jpg"
    };

    addToCart(cartProduct);
    setSuccessMessage(`${product.product_name} has been added to your cart!`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="recommendations-container">
      <h2 className="recommendations-title">Product Recommendations</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter something to get recommendations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button
          onClick={handleSearch}
          className="search-button"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {results.length > 0 && (
        <div className="results-section">
          <h4 className="results-title">Search Results:</h4>
          <ul className="results-list">
            {results.map((result, index) => (
              <li
                key={index}
                className="result-item"
              >
                <div className="product-header">
                  <div className="product-info">
                    <span className="product-name">{result.product_name}</span>
                    <span className="product-price"> - ${result.product_price}</span>
                  </div>
                  <span className="product-category">{result.category}</span>
                </div>
                <p className="product-description">{result.description}</p>
                <button 
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(result)}
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.length === 0 && !loading && (
        <p className="no-results">No results found.</p>
      )}
    </div>
  );
};

export default Recommendations;