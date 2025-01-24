const db = require('../db'); 

const getSoldProducts = async (req, res) => {
  try {
    const query = `
      SELECT p.name, p.price, SUM(s.quantity) AS items_sold, SUM(s.total_price) AS total_sales
      FROM sales s
      JOIN products p ON s.product_id = p.id
      GROUP BY p.name, p.price;
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sold products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get daily sales transactions
const getDailySales = async (req, res) => {
  try {
    const query = `
      SELECT DATE(s.sale_date) AS date, SUM(s.total_price) AS total_sales
      FROM sales s
      GROUP BY DATE(s.sale_date)
      ORDER BY DATE(s.sale_date);
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching daily sales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getSoldProducts,
  getDailySales,
};
