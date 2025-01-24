const pool = require('../db');  

exports.createOrder = async (req, res) => {
  const {
    user_id,
    name,
    address,
    creditCard,
    orderId,
    purchaseDate,
    shipDate,
    products,
    shippingCost,
    discount,
    totalSales,
    storeId,
    storeAddress
  } = req.body;

  try {
    await pool.query('BEGIN');

    const orderQuery = `
      INSERT INTO orders (user_id, name, credit_card, order_id, purchase_date, ship_date, shipping_cost, discount, total_sales, store_id, street, city, state, zip)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id
    `;
    const orderValues = [
      user_id,
      name,
      creditCard,
      orderId,
      purchaseDate,
      shipDate,
      shippingCost,
      discount,
      totalSales,
      storeId || null, 
      address?.street || storeAddress?.street || null,
      address?.city || storeAddress?.city || null,
      address?.state || storeAddress?.state || null,
      address?.zip || storeAddress?.zip || null
    ];

    const result = await pool.query(orderQuery, orderValues);
    const orderIdFromDB = result.rows[0].id;  
   
    const productQuery = `
      INSERT INTO order_products (order_id, product_id, category, quantity, price)
      VALUES ($1, $2, $3, $4, $5)
    `;

    for (let product of products) {
      const productValues = [
        orderIdFromDB,
        product.productId,
        product.category,
        product.quantity,
        product.price
      ];
      await pool.query(productQuery, productValues);
    }

    await pool.query('COMMIT');

    res.status(201).json({
      message: 'Order placed successfully!',
      orderId: orderIdFromDB
    });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place the order' });
  }
};
