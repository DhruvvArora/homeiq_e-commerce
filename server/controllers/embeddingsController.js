const { getEmbedding } = require("../services/openaiService");
const { addReviewToElastic, searchReviewsInElastic } = require("../services/elasticService");

exports.addReview = async (req, res) => {
  const { reviewText } = req.body;
  const embedding = await getEmbedding(reviewText);
  await addReviewToElastic(reviewText, embedding);
  res.status(201).send("Review added successfully");
};

exports.searchReviews = async (req, res) => {
  const { query } = req.body;
  const queryEmbedding = await getEmbedding(query);
  const results = await searchReviewsInElastic(queryEmbedding);
  res.json(results);
};
