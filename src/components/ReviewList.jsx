import React, { useEffect, useState } from 'react';
import '../styles/ReviewList.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch('http://localhost:5000/api/reviews');
      const data = await response.json();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  return (
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <h3 className="review-title">{review.productModelName}</h3>
          <p className="review-text">{review.reviewText}</p>
          <div className="review-rating">
            <span className="rating-label">Rating:</span>
            <span className="rating-value">{review.reviewRating}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
