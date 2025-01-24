import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/trending.css';

const Trending = () => {
  const [topLikedProducts, setTopLikedProducts] = useState([]);
  const [topZipCodes, setTopZipCodes] = useState([]);
  const [topSoldProducts, setTopSoldProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const [likedRes, zipRes, soldRes] = await Promise.all([
          axios.get('http://localhost:5000/api/trending/top-liked-products'),
          axios.get('http://localhost:5000/api/trending/top-zip-codes'),
          axios.get('http://localhost:5000/api/trending/top-sold-products'),
        ]);

        setTopLikedProducts(likedRes.data);
        setTopZipCodes(zipRes.data);
        setTopSoldProducts(soldRes.data);
      } catch (error) {
        console.error('Error fetching trending data:', error);
      }
    };

    fetchTrendingData();
  }, []);

  const renderProductList = (products, type) => {
    if (products.length === 0) {
      return <p className="empty-message">No {type} products to display.</p>;
    }

    return (
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span className="product-name">{product.name}</span>
            <span className="product-stat">
              {type === 'liked' && (
                <>
                  Likes: <span>{product.likes}</span>
                </>
              )}
              {type === 'sold' && (
                <>
                  Units Sold: <span>{product.total_quantity_sold}</span>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const renderZipCodeList = (zipCodes) => {
    if (zipCodes.length === 0) {
      return <p className="empty-message">No zip codes to display.</p>;
    }

    return (
      <ul>
        {zipCodes.map((zip, index) => (
          <li key={index}>
            <span className="product-name">Zip Code: {zip.zip_code}</span>
            <span className="product-stat">
              Sales Count: <span>{zip.sales_count}</span>
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="trending-container">
      <h2>Trending</h2>

      <section>
        <h3>Top 5 Most Liked Products</h3>
        {renderProductList(topLikedProducts, 'liked')}
      </section>

      <section>
        <h3>Top 5 Zip Codes with Maximum Sales</h3>
        {renderZipCodeList(topZipCodes)}
      </section>

      <section>
        <h3>Top 5 Most Sold Products</h3>
        {renderProductList(topSoldProducts, 'sold')}
      </section>
    </div>
  );
};

export default Trending;
