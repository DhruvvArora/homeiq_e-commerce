const express = require("express");
const { addReview, searchReviews } = require("../controllers/embeddingsController");

const router = express.Router();
router.post("/add", addReview);
router.post("/search", searchReviews);

module.exports = router;
