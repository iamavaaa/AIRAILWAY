import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const Analytics = ({ activeTrains }) => {
  const [timeRange, setTimeRange] = useState('24h');
  const [analyticsData, setAnalyticsData] = useState({
    performanceTrend: [],
    delayAnalysis: [],
    efficiencyMetrics: [],
    routePerformance: []
  });

  useEffect(() => {
    // Generate sample analytics data
    const generatePerformanceTrend = () => {
      const data = [];
      for (let i = 0; i < 24; i++) {
        data.push({
          hour: `${i}:00`,
          efficiency: Math.floor(Math.random() * 20) + 80,
          delays: Math.floor(Math.random() * 10),
          throughput: Math.floor(Math.random() * 50) + 100
        });
      }
      return data;
    };

    const generateDelayAnalysis = () => {
      return [
        { category: 'Weather', count: 15, percentage: 30 },
        { category: 'Technical', count: 12, percentage: 24 },
        { category: 'Traffic', count: 10, percentage: 20 },
        { category: 'Maintenance', count: 8, percentage: 16 },
        { category: 'Other', count: 5, percentage: 10 }
      ];
    };

    const generateEfficiencyMetrics = () => {
      return [
        { route: 'Delhi-Mumbai', efficiency: 92, trains: 45 },
        { route: 'Delhi-Chandigarh', efficiency: 88, trains: 32 },
        { route: 'Mumbai-Pune', efficiency: 95, trains: 28 },
        { route: 'Kolkata-Delhi', efficiency: 85, trains: 38 },
        { route: 'Delhi-Varanasi', efficiency: 90, trains: 25 }
      ];
    };

    setAnalyticsData({
      performanceTrend: generatePerformanceTrend(),
      delayAnalysis: generateDelayAnalysis(),
      efficiencyMetrics: generateEfficiencyMetrics(),
      routePerformance: generateEfficiencyMetrics()
    });
  }, [timeRange]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const calculateOverallStats = () => {
    const totalTrains = activeTrains.length;
    const onTimeTrains = activeTrains.filter(train => train.status === 'on-time').length;
    const delayedTrains = activeTrains.filter(train => train.status === 'delayed').length;
    const averageDelay = activeTrains.reduce((sum, train) => sum + train.delay, 0) / totalTrains || 0;
    const efficiency = totalTrains > 0 ? ((onTimeTrains / totalTrains) * 100) : 0;

    return {
      totalTrains,
      onTimeTrains,
      delayedTrains,
      averageDelay: Math.round(averageDelay * 10) / 10,
      efficiency: Math.round(efficiency * 10) / 10
    };
  };

  const stats = calculateOverallStats();

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Analytics Dashboard</h1>
        <p className="dashboard-subtitle">
          Performance metrics and insights for train operations
        </p>
        
        <div className="flex gap-4 mb-6">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              className={`btn ${timeRange === range ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.efficiency}%</div>
          <div className="stat-label">System Efficiency</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.onTimeTrains}</div>
          <div className="stat-label">On-Time Trains</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.delayedTrains}</div>
          <div className="stat-label">Delayed Trains</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.averageDelay} min</div>
          <div className="stat-label">Average Delay</div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="chart-container">
          <h3 className="chart-title">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Delay Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.delayAnalysis}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {analyticsData.delayAnalysis.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Route Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData.routePerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="route" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="efficiency" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle size={20} className="text-green-500" />
              <div>
                <p className="font-medium text-green-800">High Performance</p>
                <p className="text-sm text-green-600">System efficiency above 85%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle size={20} className="text-yellow-500" />
              <div>
                <p className="font-medium text-yellow-800">Weather Delays</p>
                <p className="text-sm text-yellow-600">30% of delays due to weather conditions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp size={20} className="text-blue-500" />
              <div>
                <p className="font-medium text-blue-800">Improvement Trend</p>
                <p className="text-sm text-blue-600">5% efficiency increase this month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
              <p className="font-medium text-blue-800">Route Optimization</p>
              <p className="text-sm text-blue-600">Consider alternative routes during peak hours</p>
            </div>
            <div className="p-3 border-l-4 border-green-500 bg-green-50">
              <p className="font-medium text-green-800">Maintenance Schedule</p>
              <p className="text-sm text-green-600">Schedule maintenance during low-traffic periods</p>
            </div>
            <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
              <p className="font-medium text-yellow-800">Weather Monitoring</p>
              <p className="text-sm text-yellow-600">Implement advanced weather prediction systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
