import React, { useState } from 'react';
import { Play, Pause, Square, Settings, AlertTriangle, CheckCircle } from 'lucide-react';

const TrainControl = ({ activeTrains, setActiveTrains }) => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [controlMode, setControlMode] = useState('manual');

  const handleSpeedChange = (trainId, newSpeed) => {
    setActiveTrains(prevTrains =>
      prevTrains.map(train =>
        train.id === trainId
          ? { ...train, currentSpeed: Math.min(newSpeed, train.maxSpeed) }
          : train
      )
    );
  };

  const handleEmergencyStop = (trainId) => {
    setActiveTrains(prevTrains =>
      prevTrains.map(train =>
        train.id === trainId
          ? { ...train, currentSpeed: 0, status: 'emergency' }
          : train
      )
    );
  };

  const handleRouteOptimization = () => {
    // Simulate AI-powered route optimization
    setActiveTrains(prevTrains =>
      prevTrains.map(train => ({
        ...train,
        delay: Math.max(0, train.delay - Math.floor(Math.random() * 5)),
        status: train.delay <= 2 ? 'on-time' : 'delayed'
      }))
    );
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Train Control Center</h1>
        <p className="dashboard-subtitle">
          Manual and automated control of train operations
        </p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Control Mode</h2>
          <div className="flex gap-4 mb-6">
            <button
              className={`btn ${controlMode === 'manual' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setControlMode('manual')}
            >
              Manual Control
            </button>
            <button
              className={`btn ${controlMode === 'auto' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setControlMode('auto')}
            >
              Auto Control
            </button>
          </div>
          
          <div className="control-panel">
            <h3 className="text-lg font-semibold mb-4">System Controls</h3>
            <div className="control-buttons">
              <button className="btn btn-success" onClick={handleRouteOptimization}>
                <CheckCircle size={16} />
                <span style={{ marginLeft: '8px' }}>Optimize Routes</span>
              </button>
              <button className="btn btn-danger">
                <AlertTriangle size={16} />
                <span style={{ marginLeft: '8px' }}>Emergency Stop All</span>
              </button>
              <button className="btn btn-secondary">
                <Settings size={16} />
                <span style={{ marginLeft: '8px' }}>System Settings</span>
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Train Selection</h2>
          <div className="space-y-2">
            {activeTrains.map((train) => (
              <div
                key={train.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedTrain?.id === train.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTrain(train)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{train.name}</h4>
                    <p className="text-sm text-gray-600">{train.route}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{train.currentSpeed} km/h</div>
                    <div className="text-sm text-gray-600">
                      {train.delay > 0 ? `${train.delay} min delay` : 'On time'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTrain && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            Control: {selectedTrain.name}
          </h2>
          
          <div className="grid grid-3">
            <div className="control-panel">
              <h3 className="text-lg font-semibold mb-4">Speed Control</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Speed: {selectedTrain.currentSpeed} km/h
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={selectedTrain.maxSpeed}
                    value={selectedTrain.currentSpeed}
                    onChange={(e) => handleSpeedChange(selectedTrain.id, parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 km/h</span>
                    <span>{selectedTrain.maxSpeed} km/h</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => handleSpeedChange(selectedTrain.id, selectedTrain.maxSpeed)}
                  >
                    <Play size={16} />
                    <span style={{ marginLeft: '8px' }}>Max Speed</span>
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleSpeedChange(selectedTrain.id, 0)}
                  >
                    <Pause size={16} />
                    <span style={{ marginLeft: '8px' }}>Stop</span>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleEmergencyStop(selectedTrain.id)}
                  >
                    <Square size={16} />
                    <span style={{ marginLeft: '8px' }}>Emergency</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="control-panel">
              <h3 className="text-lg font-semibold mb-4">Route Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">{selectedTrain.route}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Station:</span>
                  <span className="font-medium">{selectedTrain.nextStation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ETA:</span>
                  <span className="font-medium">{selectedTrain.estimatedArrival}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    selectedTrain.status === 'on-time' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {selectedTrain.status === 'on-time' ? 'On Time' : 'Delayed'}
                  </span>
                </div>
              </div>
            </div>

            <div className="control-panel">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="btn btn-primary w-full">
                  Change Route
                </button>
                <button className="btn btn-secondary w-full">
                  Schedule Maintenance
                </button>
                <button className="btn btn-secondary w-full">
                  Update Schedule
                </button>
                <button className="btn btn-danger w-full">
                  Emergency Protocol
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainControl;
