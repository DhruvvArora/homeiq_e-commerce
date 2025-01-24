const pool = require('../db'); 


const getProducts = async (req, res) => {
  try {
    const products = await pool.query('SELECT id, name FROM products');
    const productsArray = products.rows;
    res.json(productsArray); 
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getProducts }; 
