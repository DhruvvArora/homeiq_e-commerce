const express = require('express');
const router = express.Router();
const trendingController = require('../controllers/trendingController');

router.get('/top-liked-products', trendingController.getTopLikedProducts);
router.get('/top-zip-codes', trendingController.getTopZipCodes);
router.get('/top-sold-products', trendingController.getTopSoldProducts);

module.exports = router;
