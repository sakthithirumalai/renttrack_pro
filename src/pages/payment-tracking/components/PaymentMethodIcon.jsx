import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentMethodIcon = ({ method, size = 16, showLabel = false }) => {
  const getMethodConfig = (method) => {
    switch (method?.toLowerCase()) {
      case 'upi':
        return {
          icon: 'Smartphone',
          label: 'UPI',
          className: 'text-blue-600',
          bgClassName: 'bg-blue-50'
        };
      case 'cash':
        return {
          icon: 'Banknote',
          label: 'Cash',
          className: 'text-green-600',
          bgClassName: 'bg-green-50'
        };
      case 'neft':
        return {
          icon: 'Building2',
          label: 'NEFT',
          className: 'text-purple-600',
          bgClassName: 'bg-purple-50'
        };
      case 'cheque':
        return {
          icon: 'FileText',
          label: 'Cheque',
          className: 'text-orange-600',
          bgClassName: 'bg-orange-50'
        };
      default:
        return {
          icon: 'HelpCircle',
          label: 'Unknown',
          className: 'text-muted-foreground',
          bgClassName: 'bg-muted'
        };
    }
  };

  const config = getMethodConfig(method);

  if (showLabel) {
    return (
      <div className="flex items-center space-x-2">
        <div className={`p-1.5 rounded-full ${config?.bgClassName}`}>
          <Icon name={config?.icon} size={size} className={config?.className} />
        </div>
        <span className="text-sm font-medium text-foreground">{config?.label}</span>
      </div>
    );
  }

  return (
    <div className={`p-1.5 rounded-full ${config?.bgClassName}`} title={config?.label}>
      <Icon name={config?.icon} size={size} className={config?.className} />
    </div>
  );
};

export default PaymentMethodIcon;