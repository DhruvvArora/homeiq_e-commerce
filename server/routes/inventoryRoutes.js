const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/products', inventoryController.getAllProducts);
router.get('/sale-products', inventoryController.getSaleProducts);
router.get('/rebate-products', inventoryController.getRebateProducts);


module.exports = router;
