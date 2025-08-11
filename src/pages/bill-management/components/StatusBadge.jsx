import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return {
          label: 'Paid',
          className: 'bg-success text-success-foreground',
          tooltip: 'Payment completed successfully'
        };
      case 'unpaid':
        return {
          label: 'Unpaid',
          className: 'bg-error text-error-foreground',
          tooltip: 'Payment pending'
        };
      case 'partial':
        return {
          label: 'Partial',
          className: 'bg-warning text-warning-foreground',
          tooltip: 'Partial payment received'
        };
      case 'overdue':
        return {
          label: 'Overdue',
          className: 'bg-destructive text-destructive-foreground',
          tooltip: 'Payment overdue'
        };
      default:
        return {
          label: status,
          className: 'bg-muted text-muted-foreground',
          tooltip: status
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.className} ${className}`}
      title={config?.tooltip}
    >
      {config?.label}
    </span>
  );
};

export default StatusBadge;