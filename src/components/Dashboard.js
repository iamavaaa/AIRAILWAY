import React, { useState, useEffect } from 'react';
import { Clock, Train, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import TrainList from './TrainList';
import SystemStatus from './SystemStatus';

const Dashboard = ({ activeTrains, setActiveTrains, systemStatus, setSystemStatus }) => {
  const [stats, setStats] = useState({
    totalTrains: 0,
    onTimeTrains: 0,
    delayedTrains: 0,
    averageDelay: 0,
    systemEfficiency: 0
  });

  useEffect(() => {
    // Initialize with sample data
    const sampleTrains = [
      {
        id: 'T001',
        name: 'Rajdhani Express',
        route: 'Delhi - Mumbai',
        currentSpeed: 120,
        maxSpeed: 130,
        delay: 0,
        status: 'on-time',
        nextStation: 'Agra',
        estimatedArrival: '14:30'
      },
      {
        id: 'T002',
        name: 'Shatabdi Express',
        route: 'Delhi - Chandigarh',
        currentSpeed: 110,
        maxSpeed: 120,
        delay: 5,
        status: 'delayed',
        nextStation: 'Panipat',
        estimatedArrival: '15:45'
      },
      {
        id: 'T003',
        name: 'Duronto Express',
        route: 'Mumbai - Pune',
        currentSpeed: 95,
        maxSpeed: 110,
        delay: 0,
        status: 'on-time',
        nextStation: 'Lonavala',
        estimatedArrival: '16:20'
      },
      {
        id: 'T004',
        name: 'Garib Rath',
        route: 'Kolkata - Delhi',
        currentSpeed: 0,
        maxSpeed: 100,
        delay: 15,
        status: 'delayed',
        nextStation: 'Allahabad',
        estimatedArrival: '18:30'
      },
      {
        id: 'T005',
        name: 'Vande Bharat',
        route: 'Delhi - Varanasi',
        currentSpeed: 125,
        maxSpeed: 160,
        delay: 0,
        status: 'on-time',
        nextStation: 'Kanpur',
        estimatedArrival: '17:15'
      }
    ];

    setActiveTrains(sampleTrains);
  }, [setActiveTrains]);

  useEffect(() => {
    // Calculate statistics
    const totalTrains = activeTrains.length;
    const onTimeTrains = activeTrains.filter(train => train.status === 'on-time').length;
    const delayedTrains = activeTrains.filter(train => train.status === 'delayed').length;
    const averageDelay = activeTrains.reduce((sum, train) => sum + train.delay, 0) / totalTrains || 0;
    const systemEfficiency = totalTrains > 0 ? ((onTimeTrains / totalTrains) * 100) : 0;

    setStats({
      totalTrains,
      onTimeTrains,
      delayedTrains,
      averageDelay: Math.round(averageDelay * 10) / 10,
      systemEfficiency: Math.round(systemEfficiency * 10) / 10
    });
  }, [activeTrains]);

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Train Traffic Control Dashboard</h1>
        <p className="dashboard-subtitle">
          Real-time monitoring and control of Indian Railways train operations
        </p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalTrains}</div>
            <div className="stat-label">Total Active Trains</div>
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
          <div className="stat-card">
            <div className="stat-value">{stats.systemEfficiency}%</div>
            <div className="stat-label">System Efficiency</div>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <SystemStatus systemStatus={systemStatus} setSystemStatus={setSystemStatus} />
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="btn btn-primary">
              <CheckCircle size={16} />
              <span style={{ marginLeft: '8px' }}>Optimize Routes</span>
            </button>
            <button className="btn btn-secondary">
              <AlertTriangle size={16} />
              <span style={{ marginLeft: '8px' }}>Emergency Stop</span>
            </button>
            <button className="btn btn-success">
              <TrendingUp size={16} />
              <span style={{ marginLeft: '8px' }}>Performance Report</span>
            </button>
          </div>
        </div>
      </div>

      <TrainList trains={activeTrains} />
    </div>
  );
};

export default Dashboard;
