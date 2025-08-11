import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentStatusBadge = ({ status, size = 'default' }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return {
          label: 'Paid',
          className: 'bg-success/10 text-success border-success/20',
          icon: 'CheckCircle'
        };
      case 'unpaid':
        return {
          label: 'Unpaid',
          className: 'bg-error/10 text-error border-error/20',
          icon: 'XCircle'
        };
      case 'partial':
        return {
          label: 'Partial',
          className: 'bg-warning/10 text-warning border-warning/20',
          icon: 'AlertCircle'
        };
      case 'overdue':
        return {
          label: 'Overdue',
          className: 'bg-destructive/10 text-destructive border-destructive/20',
          icon: 'Clock'
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-muted text-muted-foreground border-border',
          icon: 'HelpCircle'
        };
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    default: 14,
    lg: 16
  };

  const config = getStatusConfig(status);

  return (
    <span className={`
      inline-flex items-center space-x-1.5 font-medium rounded-full border
      ${config?.className} ${sizeClasses?.[size]}
    `}>
      <Icon name={config?.icon} size={iconSizes?.[size]} />
      <span>{config?.label}</span>
    </span>
  );
};

export default PaymentStatusBadge;