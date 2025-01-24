const pool = require('../db');

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT name, price, available_quantity FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

const getSaleProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE on_sale = TRUE');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sale products:', error);
    res.status(500).json({ message: 'Error fetching sale products' });
  }
};

const getRebateProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE manufacturer_rebate = TRUE');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching rebate products:', error);
    res.status(500).json({ message: 'Error fetching rebate products' });
  }
};

module.exports = {
  getAllProducts,
  getSaleProducts,
  getRebateProducts,
};
