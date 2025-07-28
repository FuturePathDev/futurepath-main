import React, { useEffect, useState } from 'react';
import '../../styles/AdminAnalytics.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const COLORS = ['#0d47a1', '#1976d2', '#64b5f6', '#90caf9'];

const AdminAnalytics = () => {
  const [userStats, setUserStats] = useState([]);
  const [registrationTrends, setRegistrationTrends] = useState([]);
  const [roleBreakdown, setRoleBreakdown] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulated fetch functions
    const fetchAnalyticsData = async () => {
      // Replace these with real API calls
      setUserStats([
        { label: 'Students', count: 120 },
        { label: 'Parents', count: 80 },
        { label: 'Admins', count: 5 },
      ]);

      setRegistrationTrends([
        { date: 'Jul 1', count: 5 },
        { date: 'Jul 5', count: 10 },
        { date: 'Jul 10', count: 30 },
        { date: 'Jul 15', count: 50 },
        { date: 'Jul 20', count: 60 },
        { date: 'Jul 25', count: 80 },
      ]);

      setRoleBreakdown([
        { name: 'Student', value: 120 },
        { name: 'Parent', value: 80 },
        { name: 'Admin', value: 5 },
      ]);
    };

    fetchAnalyticsData();
  }, []);

  const filteredRegistrationTrends =
    filter === 'all'
      ? registrationTrends
      : registrationTrends.filter((r) => r.date.includes(filter));

  return (
    <div className="admin-analytics-container">
      <h2 className="admin-title">Admin Analytics Dashboard</h2>

      <div className="analytics-section">
        <h3>User Role Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={roleBreakdown}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {roleBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-section">
        <h3>Registrations Over Time</h3>
        <div>
          <label htmlFor="filter">Filter by date: </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="1">Jul 1</option>
            <option value="5">Jul 5</option>
            <option value="10">Jul 10</option>
            <option value="15">Jul 15</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredRegistrationTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#0d47a1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-section">
        <h3>User Role Bar Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
