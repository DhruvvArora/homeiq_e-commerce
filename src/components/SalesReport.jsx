import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "../styles/salesReport.css";

Chart.register(...registerables);

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const salesResponse = await axios.get('http://localhost:5000/api/sales/products'); 
        const dailySalesResponse = await axios.get('http://localhost:5000/api/sales/daily-transactions'); 

        setSalesData(salesResponse.data);
        setDailySales(dailySalesResponse.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  const chartData = {
    labels: salesData.map(product => product.name),
    datasets: [
      {
        label: 'Total Sales',
        data: salesData.map(product => product.total_sales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className='sales-body'>
      <h2>Sales Report</h2>

      {/* 1. Table of all products sold */}
      <h4>Products Sold</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Number of Items Sold</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map(product => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.items_sold}</td>
              <td>${product.total_sales}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 2. Bar Chart for Total Sales */}
      <h4>Total Sales per Product</h4>
      <div className="chart-container">
        {salesData.length > 0 && (
          <Bar data={chartData} />
        )}
      </div>

      {/* 3. Table of total daily sales transactions */}
      <h4>Daily Sales Transactions</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {dailySales.map(sale => (
            <tr key={sale.date}>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
              <td>${sale.total_sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
