// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [bestSeller, setBestSeller] = useState({});
  const [userCount, setUserCount] = useState(0);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin-stats").then((res) => {
      setBestSeller(res.data.bestSeller);
      setUserCount(res.data.userCount);
      setYearlyData(res.data.yearlyData);
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-cards">
        <div className="admin-card">
          <h2>👑 Best Seller</h2>
          <p>{bestSeller.name}</p>
          <p>Sold: {bestSeller.count}</p>
        </div>

        <div className="admin-card">
          <h2>👥 Total Users</h2>
          <p>{userCount}</p>
        </div>
      </div>

      <div className="admin-chart">
        <h2>📈 Yearly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
