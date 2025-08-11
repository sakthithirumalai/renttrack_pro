import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      badge: null,
      tooltip: 'Financial overview and quick access to critical functions'
    },
    {
      label: 'Tenants',
      path: '/tenant-management',
      icon: 'Users',
      badge: null,
      tooltip: 'Comprehensive tenant portfolio management'
    },
    {
      label: 'Bill Creation',
      path: '/bill-creation',
      icon: 'FileText',
      badge: null,
      tooltip: 'Create and manage rent bills'
    },
    {
      label: 'Bill Management',
      path: '/bill-management',
      icon: 'Receipt',
      badge: 3,
      tooltip: 'Track and manage all billing activities'
    },
    {
      label: 'Payments',
      path: '/payment-tracking',
      icon: 'CreditCard',
      badge: 2,
      tooltip: 'Payment tracking and proof management'
    },
    {
      label: 'Reports',
      path: '/reports-analytics',
      icon: 'BarChart3',
      badge: null,
      tooltip: 'Advanced analytics and exportable insights'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const handleItemClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-900 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 bg-card border-r border-border z-900
        transform transition-transform duration-200 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={handleItemClick}
                className={`
                  group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth
                  ${isActive(item?.path) 
                    ? 'bg-primary text-primary-foreground shadow-soft' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                title={item?.tooltip}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className={isActive(item?.path) ? 'text-primary-foreground' : 'text-current'}
                  />
                  <span className="font-medium">{item?.label}</span>
                </div>
                
                {item?.badge && (
                  <span className={`
                    px-2 py-0.5 text-xs font-medium rounded-full
                    ${isActive(item?.path) 
                      ? 'bg-primary-foreground text-primary' 
                      : 'bg-error text-error-foreground'
                    }
                  `}>
                    {item?.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Icon name="TrendingUp" size={16} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Monthly Revenue</p>
                  <p className="text-xs text-muted-foreground">December 2024</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-success font-mono">$24,580</p>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;