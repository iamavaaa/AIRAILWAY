import React from 'react';
import { Clock, MapPin, Gauge, AlertCircle, Train, CheckCircle, XCircle, Wrench } from 'lucide-react';

const TrainList = ({ trains }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'on-time':
        return <span className="status-on-time">On Time</span>;
      case 'delayed':
        return <span className="status-delayed">Delayed</span>;
      case 'cancelled':
        return <span className="status-cancelled">Cancelled</span>;
      case 'maintenance':
        return <span className="status-maintenance">Maintenance</span>;
      default:
        return <span className="status-on-time">Unknown</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'delayed':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-500" />;
      case 'maintenance':
        return <Wrench size={16} className="text-purple-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="train-list">
      <div className="train-list-header">
        <h2 className="train-list-title">Active Trains</h2>
        <p className="train-list-subtitle">Real-time status of all trains in the system</p>
      </div>
      
      {trains.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <Train size={48} className="mx-auto mb-4 opacity-50" />
          <p>No active trains found</p>
        </div>
      ) : (
        trains.map((train) => (
          <div key={train.id} className="train-item">
            <div className="train-info">
              <div className="train-icon">
                <Train size={20} />
              </div>
              <div className="train-details">
                <h3>{train.name}</h3>
                <p><MapPin size={14} /> {train.route}</p>
                <p><Clock size={14} /> Next: {train.nextStation} at {train.estimatedArrival}</p>
              </div>
            </div>
            
            <div className="train-metrics">
              <div className="metric">
                <div className="metric-value">{train.currentSpeed}</div>
                <div className="metric-label">km/h</div>
              </div>
              <div className="metric">
                <div className="metric-value">{train.delay}</div>
                <div className="metric-label">min delay</div>
              </div>
              <div className="metric">
                <div className="metric-value">{train.maxSpeed}</div>
                <div className="metric-label">max km/h</div>
              </div>
              <div className="metric">
                {getStatusBadge(train.status)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TrainList;
