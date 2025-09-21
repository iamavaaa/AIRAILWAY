import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TrainControl from './components/TrainControl';
import Analytics from './components/Analytics';
import AIOptimization from './components/AIOptimization';
import './App.css';

function App() {
  const [activeTrains, setActiveTrains] = useState([]);
  const [systemStatus, setSystemStatus] = useState('operational');

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setActiveTrains(prevTrains => 
        prevTrains.map(train => ({
          ...train,
          currentSpeed: Math.max(0, train.currentSpeed + (Math.random() - 0.5) * 10),
          delay: Math.max(0, train.delay + (Math.random() - 0.5) * 2)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  activeTrains={activeTrains}
                  setActiveTrains={setActiveTrains}
                  systemStatus={systemStatus}
                  setSystemStatus={setSystemStatus}
                />
              } 
            />
            <Route 
              path="/control" 
              element={
                <TrainControl 
                  activeTrains={activeTrains}
                  setActiveTrains={setActiveTrains}
                />
              } 
            />
            <Route 
              path="/analytics" 
              element={<Analytics activeTrains={activeTrains} />} 
            />
            <Route 
              path="/ai-optimization" 
              element={
                <AIOptimization 
                  activeTrains={activeTrains}
                  setActiveTrains={setActiveTrains}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
