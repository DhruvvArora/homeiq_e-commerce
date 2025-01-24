import React, { useState } from "react";
import axios from "axios";
import "../styles/Review.css";

const Review = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5001/search_reviews", {
        query,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div className="review-container">
      <h2 className="review-title">Search Reviews</h2>
      <div className="search-section">
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter something to search reviews..."
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="results-section">
        <h4 className="results-title">Results:</h4>
        {results.map((result, index) => (
          <div key={index} className="result-card">
            <p className="review-text">
              {result.product_name} - {result.rating}/5:
              <br />
              {result.review_text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;