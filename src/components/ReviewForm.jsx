import React, { useState } from 'react';
import '../styles/reviewForm.css';

const ReviewForm = () => {
  const [reviewData, setReviewData] = useState({
    productModelName: '',
    productCategory: '',
    productPrice: '',
    storeID: '',
    storeZip: '',
    storeCity: '',
    storeState: '',
    productOnSale: false,
    manufacturerName: '',
    manufacturerRebate: false,
    userID: '',
    userAge: '',
    userGender: '',
    userOccupation: '',
    reviewRating: '',
    reviewDate: '',
    reviewText: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      if (response.ok) {
        alert('Review submitted successfully');
        setReviewData({
          productModelName: '',
          productCategory: '',
          productPrice: '',
          storeID: '',
          storeZip: '',
          storeCity: '',
          storeState: '',
          productOnSale: false,
          manufacturerName: '',
          manufacturerRebate: false,
          userID: '',
          userAge: '',
          userGender: '',
          userOccupation: '',
          reviewRating: '',
          reviewDate: '',
          reviewText: ''
        });
      } else {
        alert('Error submitting review');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit review');
    }
  };

  return (
    <div className="review-form">
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="productModelName" value={reviewData.productModelName} onChange={handleChange} placeholder="Product Model Name" required />
          <input type="text" name="productCategory" value={reviewData.productCategory} onChange={handleChange} placeholder="Product Category" required />
        </div>
        <div className="form-row">
          <input type="number" name="productPrice" value={reviewData.productPrice} onChange={handleChange} placeholder="Product Price" required />
          <input type="text" name="storeID" value={reviewData.storeID} onChange={handleChange} placeholder="Store ID" required />
        </div>
        <div className="form-row">
          <input type="text" name="storeZip" value={reviewData.storeZip} onChange={handleChange} placeholder="Store Zip" />
          <input type="text" name="storeCity" value={reviewData.storeCity} onChange={handleChange} placeholder="Store City" />
        </div>
        <div className="form-row">
          <input type="text" name="storeState" value={reviewData.storeState} onChange={handleChange} placeholder="Store State" />
          <input type="text" name="manufacturerName" value={reviewData.manufacturerName} onChange={handleChange} placeholder="Manufacturer Name" />
        </div>
        
        <div className="form-row">
        <input type="text" name="userID" value={reviewData.userID} onChange={handleChange} placeholder="User ID" required />
        <input type="number" name="userAge" value={reviewData.userAge} onChange={handleChange} placeholder="User Age" required />
        </div>
        <div className="form-row">
        <input type="text" name="userGender" value={reviewData.userGender} onChange={handleChange} placeholder="User Gender" required />
        <input type="text" name="userOccupation" value={reviewData.userOccupation} onChange={handleChange} placeholder="User Occupation" required />
        </div>
        <div className="form-row">
        <input type="number" name="reviewRating" value={reviewData.reviewRating} onChange={handleChange} placeholder="Review Rating" required />
        <input type="date" name="reviewDate" value={reviewData.reviewDate} onChange={handleChange} placeholder="Review Date" required />
        </div>
<div className="checkbox-group">
  <label>
    <input type="checkbox" name="productOnSale" checked={reviewData.productOnSale} onChange={handleChange} />
    Product on Sale
  </label>
  <label>
    <input type="checkbox" name="manufacturerRebate" checked={reviewData.manufacturerRebate} onChange={handleChange} />
    Manufacturer Rebate
  </label>
</div>

<textarea
  name="reviewText"
  value={reviewData.reviewText}
  onChange={handleChange}
  placeholder="Review Text"
  required
/>

<button type="submit">Submit Review</button>

      </form>
    </div>
  );
};

export default ReviewForm;
