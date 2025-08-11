import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const FloatingActionButton = ({ onClick }) => {
  const location = useLocation();

  const getContextualAction = () => {
    switch (location?.pathname) {
      case '/dashboard':
        return {
          label: 'Create New Bill',
          icon: 'Plus',
          action: () => window.location.href = '/bill-creation'
        };
      case '/tenant-management':
        return {
          label: 'Add Tenant',
          icon: 'UserPlus',
          action: () => console.log('Add new tenant')
        };
      case '/bill-creation':
        return {
          label: 'Quick Bill',
          icon: 'Zap',
          action: () => console.log('Create quick bill')
        };
      case '/bill-management':
        return {
          label: 'Bulk Action',
          icon: 'List',
          action: () => console.log('Bulk bill actions')
        };
      case '/payment-tracking':
        return {
          label: 'Record Payment',
          icon: 'DollarSign',
          action: () => console.log('Record new payment')
        };
      case '/reports-analytics':
        return {
          label: 'Export Report',
          icon: 'Download',
          action: () => console.log('Export current report')
        };
      default:
        return {
          label: 'Quick Action',
          icon: 'Plus',
          action: () => console.log('Default action')
        };
    }
  };

  const contextualAction = getContextualAction();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      contextualAction?.action();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-950">
      <Button
        onClick={handleClick}
        className="w-14 h-14 rounded-full shadow-fab hover:shadow-modal transition-all duration-200 hover:scale-105 bg-primary hover:bg-primary/90"
        title={contextualAction?.label}
      >
        <Icon name={contextualAction?.icon} size={24} color="white" />
      </Button>
    </div>
  );
};

export default FloatingActionButton;