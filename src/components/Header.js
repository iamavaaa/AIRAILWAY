import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Train, BarChart3, Settings, Brain } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Train },
    { path: '/control', label: 'Control', icon: Settings },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/ai-optimization', label: 'AI Optimization', icon: Brain }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">
            <Train size={24} />
          </div>
          <div className="logo-text">
            Smart Train Control
          </div>
        </div>
        <nav className="nav">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${location.pathname === path ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span style={{ marginLeft: '8px' }}>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
