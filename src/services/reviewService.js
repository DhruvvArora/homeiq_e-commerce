export const searchReviews = async (query) => {
    const response = await fetch("http://localhost:5000/api/reviews/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data;
  };
