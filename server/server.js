const pool = require('./db');  
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


// routes connection
const orderRoutes = require('./routes/orderRoutes');
const trendingRoutes = require('./routes/trendingRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoute');
const searchBarRoutes = require('./routes/searchBarRoutes'); 
const ticketRoutes = require('./routes/ticketRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // open ai

// initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());


// mongo db connection
const mongoose = require('mongoose');

const reviewsRouter = require('./routes/reviewRoutesMongo');
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });


// usage of routes
app.use('/api', orderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/products', searchBarRoutes);
app.use('/api/trending', trendingRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/mongoReviews', reviewsRouter);
app.use("/api/reviews", reviewRoutes); // open ai


// ------------------------------------------------------------------------------------------------------------------------------------------------

// define the controller for placing orders
const placeOrder = async (req, res) => {
    const {
        user_id,
        name,
        address,
        creditCard,
        orderId,
        purchaseDate,
        shipDate,
        products,
        totalSales,
        shippingOption,
        storeId,
        storeAddress,
        shippingCost,
        discount
    } = req.body;

    try {
        // Insert into the orders table
        const result = await pool.query(
            'INSERT INTO orders (user_id, name, address, credit_card, order_id, purchase_date, ship_date, total_sales, shipping_option, store_id, store_address, shipping_cost, discount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
            [
                user_id, name, address, creditCard, orderId, purchaseDate, shipDate,
                totalSales, shippingOption, storeId, storeAddress, shippingCost, discount
            ]
        );

        // Iterate over products and save each one to the database
        for (const product of products) {
            await pool.query(
                'INSERT INTO order_products (order_id, product_id, category, quantity, price) VALUES ($1, $2, $3, $4, $5)',
                [orderId, product.productId, product.category, product.quantity, product.price]
            );
        }

        res.status(201).json({ message: 'Order placed successfully', order: result.rows[0] });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Database error', error });
    }
};


// ------------------------------------------------------------------------------------------------------------------------------------------------

// authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Access token required' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// authorize Manager Middleware
const authorizeManager = (req, res, next) => {
    if (req.user && req.user.role === 'manager') {
        next(); // User is a manager
    } else {
        res.status(403).json({ message: 'Access denied: Managers only' });
    }
};


// ------------------------------------------------------------------------------------------------------------------------------------------------

// user Registration Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const role = 'user';

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const result = await pool.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
            [username, hashedPassword, role]
        );
        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        if (error.code === '23505') {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            res.status(500).json({ message: 'Database error', error });
        }
    }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

// user Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT id, username, password, role FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Database error', error });
    }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

// inventory Route (Accessible only to managers)
app.get('/inventory', authenticateToken, authorizeManager, async (req, res) => {
    try {
        const result = await pool.query('SELECT name, price, quantity FROM products');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Database error', error });
    }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

// start the server
app.listen(5002, () => {
    console.log('Server running on port 5002');
});
