import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const BillingPeriodSelector = ({ 
  billingMonth, 
  billingYear, 
  onMonthChange, 
  onYearChange,
  dueDate,
  onDueDateChange 
}) => {
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const currentYear = new Date()?.getFullYear();
  const years = [];
  for (let i = currentYear - 1; i <= currentYear + 2; i++) {
    years?.push({ value: i?.toString(), label: i?.toString() });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Billing Period</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Billing Month"
          placeholder="Select month"
          required
          options={months}
          value={billingMonth}
          onChange={onMonthChange}
        />
        
        <Select
          label="Billing Year"
          placeholder="Select year"
          required
          options={years}
          value={billingYear}
          onChange={onYearChange}
        />
      </div>
      <Input
        label="Due Date"
        type="date"
        description="Payment due date for this bill"
        required
        value={dueDate}
        onChange={(e) => onDueDateChange(e?.target?.value)}
        min={new Date()?.toISOString()?.split('T')?.[0]}
        className="mt-4"
      />
    </div>
  );
};

export default BillingPeriodSelector;