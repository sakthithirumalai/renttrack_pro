import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';

const PaymentStatusDropdown = ({ currentStatus, paymentId, onStatusChange, disabled = false }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'partial', label: 'Partial' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus || disabled) return;

    setIsUpdating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onStatusChange) {
        onStatusChange(paymentId, newStatus);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update payment status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative">
      <Select
        options={statusOptions}
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={disabled || isUpdating}
        className="min-w-[120px]"
      />
      
      {isUpdating && (
        <div className="absolute inset-0 bg-background/50 rounded-md flex items-center justify-center">
          <Icon name="Loader2" size={16} className="animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default PaymentStatusDropdown;