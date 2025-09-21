import React, { useState, useEffect } from 'react';
import { Brain, Zap, Target, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const AIOptimization = ({ activeTrains, setActiveTrains }) => {
  const [optimizationStatus, setOptimizationStatus] = useState('idle');
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [aiMetrics, setAiMetrics] = useState({
    efficiency: 0,
    delayReduction: 0,
    fuelSavings: 0,
    throughputIncrease: 0
  });

  const [optimizationHistory, setOptimizationHistory] = useState([]);

  useEffect(() => {
    // Simulate AI metrics calculation
    const calculateMetrics = () => {
      const totalTrains = activeTrains.length;
      const onTimeTrains = activeTrains.filter(train => train.status === 'on-time').length;
      const efficiency = totalTrains > 0 ? ((onTimeTrains / totalTrains) * 100) : 0;
      
      setAiMetrics({
        efficiency: Math.round(efficiency * 10) / 10,
        delayReduction: Math.floor(Math.random() * 20) + 10,
        fuelSavings: Math.floor(Math.random() * 15) + 5,
        throughputIncrease: Math.floor(Math.random() * 25) + 15
      });
    };

    calculateMetrics();
    const interval = setInterval(calculateMetrics, 10000);
    return () => clearInterval(interval);
  }, [activeTrains]);

  const runOptimization = async () => {
    setOptimizationStatus('running');
    
    // Simulate AI optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate optimization results
    const results = {
      timestamp: new Date().toLocaleTimeString(),
      improvements: {
        routeOptimization: Math.floor(Math.random() * 10) + 5,
        speedAdjustments: Math.floor(Math.random() * 8) + 3,
        scheduleOptimization: Math.floor(Math.random() * 12) + 4,
        conflictResolution: Math.floor(Math.random() * 6) + 2
      },
      estimatedSavings: {
        time: Math.floor(Math.random() * 30) + 15,
        fuel: Math.floor(Math.random() * 20) + 10,
        cost: Math.floor(Math.random() * 50000) + 25000
      }
    };

    setOptimizationResults(results);
    setOptimizationStatus('completed');
    
    // Add to history
    setOptimizationHistory(prev => [results, ...prev.slice(0, 4)]);
    
    // Apply optimizations to trains
    setActiveTrains(prevTrains =>
      prevTrains.map(train => ({
        ...train,
        delay: Math.max(0, train.delay - Math.floor(Math.random() * 5)),
        status: train.delay <= 2 ? 'on-time' : 'delayed'
      }))
    );
  };

  const getOptimizationStatusColor = (status) => {
    switch (status) {
      case 'idle':
        return 'text-gray-500';
      case 'running':
        return 'text-blue-500';
      case 'completed':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getOptimizationStatusIcon = (status) => {
    switch (status) {
      case 'idle':
        return <Brain size={20} className="text-gray-500" />;
      case 'running':
        return <Zap size={20} className="text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'error':
        return <AlertTriangle size={20} className="text-red-500" />;
      default:
        return <Brain size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">AI-Powered Optimization</h1>
        <p className="dashboard-subtitle">
          Advanced machine learning algorithms for train traffic optimization
        </p>
      </div>

      <div className="ai-panel">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">AI Optimization Engine</h2>
          <div className="flex items-center gap-3">
            {getOptimizationStatusIcon(optimizationStatus)}
            <span className={`font-medium capitalize ${getOptimizationStatusColor(optimizationStatus)}`}>
              {optimizationStatus}
            </span>
          </div>
        </div>
        
        <div className="grid grid-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{aiMetrics.efficiency}%</div>
            <div className="text-sm opacity-90">System Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{aiMetrics.delayReduction}%</div>
            <div className="text-sm opacity-90">Delay Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{aiMetrics.fuelSavings}%</div>
            <div className="text-sm opacity-90">Fuel Savings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{aiMetrics.throughputIncrease}%</div>
            <div className="text-sm opacity-90">Throughput Increase</div>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Optimization Controls</h2>
          
          <div className="space-y-4">
            <button
              className="btn btn-primary w-full"
              onClick={runOptimization}
              disabled={optimizationStatus === 'running'}
            >
              <Brain size={16} />
              <span style={{ marginLeft: '8px' }}>
                {optimizationStatus === 'running' ? 'Running Optimization...' : 'Run AI Optimization'}
              </span>
            </button>
            
            <div className="grid grid-2 gap-4">
              <button className="btn btn-secondary">
                <Target size={16} />
                <span style={{ marginLeft: '8px' }}>Route Optimization</span>
              </button>
              <button className="btn btn-secondary">
                <Clock size={16} />
                <span style={{ marginLeft: '8px' }}>Schedule Optimization</span>
              </button>
              <button className="btn btn-secondary">
                <TrendingUp size={16} />
                <span style={{ marginLeft: '8px' }}>Performance Tuning</span>
              </button>
              <button className="btn btn-secondary">
                <Zap size={16} />
                <span style={{ marginLeft: '8px' }}>Speed Optimization</span>
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">AI Model Status</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Route Optimization Model</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Delay Prediction Model</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Traffic Flow Model</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium">Weather Impact Model</span>
              <span className="text-yellow-600 font-medium">Training</span>
            </div>
          </div>
        </div>
      </div>

      {optimizationResults && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Latest Optimization Results</h2>
          
          <div className="optimization-results">
            <div className="grid grid-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Improvements Applied</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Route Optimization:</span>
                    <span className="font-medium">{optimizationResults.improvements.routeOptimization} trains</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed Adjustments:</span>
                    <span className="font-medium">{optimizationResults.improvements.speedAdjustments} trains</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schedule Optimization:</span>
                    <span className="font-medium">{optimizationResults.improvements.scheduleOptimization} trains</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conflict Resolution:</span>
                    <span className="font-medium">{optimizationResults.improvements.conflictResolution} conflicts</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Estimated Savings</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Time Saved:</span>
                    <span className="font-medium">{optimizationResults.estimatedSavings.time} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel Saved:</span>
                    <span className="font-medium">{optimizationResults.estimatedSavings.fuel} liters</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Savings:</span>
                    <span className="font-medium">₹{optimizationResults.estimatedSavings.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {optimizationHistory.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Optimization History</h2>
          
          <div className="space-y-3">
            {optimizationHistory.map((result, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Optimization Run</span>
                  <span className="text-sm text-gray-600">{result.timestamp}</span>
                </div>
                <div className="grid grid-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Time Saved:</span>
                    <span className="font-medium ml-2">{result.estimatedSavings.time} min</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fuel Saved:</span>
                    <span className="font-medium ml-2">{result.estimatedSavings.fuel} L</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Cost Saved:</span>
                    <span className="font-medium ml-2">₹{result.estimatedSavings.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIOptimization;
