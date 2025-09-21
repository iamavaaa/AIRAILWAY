import React from 'react';
import { Activity, Wifi, Shield, AlertTriangle } from 'lucide-react';

const SystemStatus = ({ systemStatus, setSystemStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      case 'maintenance':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <Activity size={20} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-500" />;
      case 'critical':
        return <AlertTriangle size={20} className="text-red-500" />;
      case 'maintenance':
        return <Shield size={20} className="text-blue-500" />;
      default:
        return <Activity size={20} className="text-gray-500" />;
    }
  };

  const systemMetrics = [
    { label: 'Network Status', value: 'Connected', status: 'operational' },
    { label: 'Signal System', value: 'Active', status: 'operational' },
    { label: 'Power Supply', value: 'Stable', status: 'operational' },
    { label: 'Safety Systems', value: 'Online', status: 'operational' }
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">System Status</h2>
        <div className="flex items-center gap-2">
          {getStatusIcon(systemStatus)}
          <span className={`font-medium capitalize ${getStatusColor(systemStatus)}`}>
            {systemStatus}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-700">{metric.label}</span>
            </div>
            <span className="text-sm text-gray-600">{metric.value}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Wifi size={16} className="text-blue-500" />
          <span className="text-sm font-medium text-blue-700">Real-time Updates</span>
        </div>
        <p className="text-xs text-blue-600">
          All systems are synchronized and updating every 5 seconds
        </p>
      </div>
    </div>
  );
};

export default SystemStatus;
