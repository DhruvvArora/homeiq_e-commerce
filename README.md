# E-Commerce Store Application

## Overview
This project is an e-commerce web application built using **React** for the frontend and **Node.js** with **Express** & **Mongo DB** for the backend. It utilizes **PostgreSQL** as the database for storing product, user, and sales data. The application supports user registration and login, product inventory management, sales reporting, and features like a search bar with autosuggestions.

## Features

### 1. **User Authentication**
   - JWT-based authentication implemented in the backend.
   - Users can register and log in.
   - Role-based access control: Managers have special privileges to manage inventory and view sales reports.

### 2. **Product Search**
   - A search bar that provides autosuggestions as users type, fetching products from the backend.
   - Suggestions are displayed in a dropdown that does not interfere with the page layout.
   
### 3. **Inventory Management (Manager Access Only)**
   - Displays all products with their stock levels in a table format.
   - Generates a bar chart showing the available stock of all products.
   - Lists products that are currently on sale and products with manufacturer rebates.

### 4. **Sales Reporting (Manager Access Only)**
   - Shows a table of products sold, including product name, price, total items sold, and total sales.
   - Generates a bar chart to visualize the sales of each product.
   - Displays daily sales transactions.

## Tech Stack

### Frontend:
- **React.js**: For building the user interface.
- # React + Vite
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Chart.js**: For creating visual representations of inventory and sales data.
- **Autosuggest**: For implementing the search bar with autosuggestions.
- **CSS**: For styling components including the search bar and tables.
- **Multer**: For uploading images and displaying it.

### Backend:
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the API.
- **Axios**: For making HTTP requests from the frontend to the backend. 

### Database:
- **PostgreSQL**: For storing user data, product inventory, sales records, and other relevant data.


## Project Setup

### Prerequisites:
- **Node.js** installed
- **PostgreSQL** installed and running
- **React** environment set up
- **Docker** installed

### Frontend Setup: 
- **npm install**: Installs all dependencies required for the project.
- **Dependencies**: npm install react react-dom axios chart.js react-chartjs-2 autosuggest


### Database Setup

1. Create a PostgreSQL database.
2. Set up tables for users, products, and sales.
3. Tickets schema: `CREATE TABLE tickets (
                        ticket_id SERIAL PRIMARY KEY,        
                        ticket_number VARCHAR(20) NOT NULL UNIQUE, 
                        decision TEXT,                        
                        created_at TIMESTAMP DEFAULT NOW()     
                     );`
   
## Run the project

1. Install all dependencies: `npm install`
2. In the terminal, in root directory, run the docker container for elasticsearch and kibana: `docker-compose up -d`
3. Run gen_reviews.py to generate reviews: `python server/scripts/gen_reviews.py`
4. Run gen_rec.py to generate recommendations: `python server/scripts/gen_rec.py`
4. The reviews and recommendations will be stored in the index `reviews` and `products` respectively on the elasticsearch index.
   - You can check the data in the elasticsearch by typing `http://localhost:9200/new_reviews/_search?q=*` and `http://localhost:9200/products/_search?q=*` in the browser.
   - Or, you can use kibana by typing `http://localhost:5601/` in the browser and check the data in the Discover tab.
5. Run combined_server.py: `python server/scripts/combined_server.py`
6. Run the application: `npm run dev`       
7. The frontend will run on port 3000.
8. The backend will run on port 5000.
9. If you have installed cros, it will combine both frontend & backend and run both simultaneously.
