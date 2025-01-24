import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "../styles/inventory.css";

Chart.register(...registerables);

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [rebateProducts, setRebateProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:5000/api/inventory/products');
        const saleResponse = await axios.get('http://localhost:5000/api/inventory/sale-products');
        const rebateResponse = await axios.get('http://localhost:5000/api/inventory/rebate-products');

        setProducts(productsResponse.data);
        setSaleProducts(saleResponse.data);
        setRebateProducts(rebateResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  // Prepare data for the chart
  const chartData = {
    labels: products.map(product => product.name),
    datasets: [
      {
        label: 'Available Quantity',
        data: products.map(product => product.available_quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className='inventory-body'>
      <h2>Inventory Management</h2>

      {/* 1. Table of all products */}
      <h4>All Products</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Available Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.available_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 2. Bar Chart for Product Stock */}
      <h4>Stock Levels</h4>
      <div className="chart-container">
        {products.length > 0 && (
          <Bar data={chartData} />
        )}
      </div>

      {/* 3. Table of products on sale */}
      <h4>Products on Sale</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Original Price</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {saleProducts.map(product => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>${product.sale_price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 4. Table of products with manufacturer rebates */}
      <h4>Products with Manufacturer Rebates</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Original Price</th>
            <th>Rebate Amount</th>
          </tr>
        </thead>
        <tbody>
          {rebateProducts.map(product => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>${product.rebate_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
