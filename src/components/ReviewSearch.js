import React, { useState } from 'react';
import { searchReviews } from '../services/reviewService.js';

const ReviewSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const similarReviews = await searchReviews(query);
    setResults(similarReviews);
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter your search text" 
      />
      <button onClick={handleSearch}>Search Reviews</button>

      <div>
        {results.map((review, index) => (
          <p key={index}>{review}</p>
        ))}
      </div>
    </div>
  );
};

export default ReviewSearch;
