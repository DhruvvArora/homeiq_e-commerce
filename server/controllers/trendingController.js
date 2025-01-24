const pool = require('../db');

exports.getTopLikedProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, price, likes
      FROM products
      ORDER BY likes DESC
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching top liked products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTopZipCodes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT zip_code, COUNT(*) AS sales_count
      FROM sales
      GROUP BY zip_code
      ORDER BY sales_count DESC
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching top zip codes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTopSoldProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.name, p.price, SUM(s.quantity) AS total_quantity_sold
      FROM sales s
      JOIN products p ON s.product_id = p.id
      GROUP BY p.id, p.name, p.price
      ORDER BY total_quantity_sold DESC
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching top sold products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
