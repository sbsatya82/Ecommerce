import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, ArcElement, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import axios from 'axios';

ChartJS.register(LineElement, CategoryScale, LinearScale, ArcElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(2000);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get('/api/v1/users'),
          axios.get('/api/v1/admin/products'),
          axios.get('/api/v1/orders')
        ]);

        setUsers(usersRes.data.users);
        setProducts(productsRes.data.products);
        setOrders(ordersRes.data.orders);

        setData([
          { name: 'Users', value: usersRes.data.users.length },
          { name: 'Products', value: productsRes.data.products.length },
          { name: 'Orders', value: ordersRes.data.orders.length },
        ]);

      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  let outOfStock = 0;
  let inStock = 0;

  products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock++;
    } else {
      inStock++;
    }
  });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: "tomato",
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutData = {
    labels: ['Out Of Stock', 'In Stock'],
    datasets: [{
      backgroundColor: ["#2f2f2f", "#0033Bd"],
      data: [outOfStock, inStock]
    }]
  };

  return (
    <Box className="dashboard-container">
      <Box className="dashboard-header">
        <Typography variant="h4">Dashboard</Typography>
        <Box className="total-amount">
          <Typography variant="h6">Total Amount</Typography>
          <Typography variant="h5">₹{totalAmount}</Typography>
        </Box>
      </Box>
      <Box className="stats-container">
        {data.map((item, index) => (
          <Link key={index} className="stat-box" to={`/admin/${item.name.toLowerCase()}/all`}>
            <Typography variant="h5">{item.name}</Typography>
            <Typography variant="h4">{item.value}</Typography>
          </Link>
        ))}
      </Box>
      <Box className="chart-container">
        <Line data={lineState} />
      </Box>
      <Box className="doughnut-container">
        <Doughnut data={doughnutData} />
      </Box>
    </Box>
  );
};

export default Dashboard;
