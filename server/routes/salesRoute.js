const express = require('express');
const { getSoldProducts, getDailySales } = require('../controllers/salesController');

const router = express.Router();

router.get('/products', getSoldProducts);
router.get('/daily-transactions', getDailySales);

module.exports = router;
