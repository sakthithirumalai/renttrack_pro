import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DateRangeSelector = ({ onDateRangeChange, selectedRange }) => {
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [isCustomRange, setIsCustomRange] = useState(false);

  const predefinedRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'thisQuarter', label: 'This Quarter' },
    { value: 'thisYear', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleRangeChange = (value) => {
    setIsCustomRange(value === 'custom');
    if (value !== 'custom') {
      onDateRangeChange({ type: value });
    }
  };

  const handleCustomRangeApply = () => {
    if (customStartDate && customEndDate) {
      onDateRangeChange({
        type: 'custom',
        startDate: customStartDate,
        endDate: customEndDate
      });
    }
  };

  const getDateRangeText = () => {
    const today = new Date();
    const formatDate = (date) => date?.toLocaleDateString('en-IN');

    switch (selectedRange?.type) {
      case 'today':
        return formatDate(today);
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday?.setDate(yesterday?.getDate() - 1);
        return formatDate(yesterday);
      case 'last7days':
        const week = new Date(today);
        week?.setDate(week?.getDate() - 7);
        return `${formatDate(week)} - ${formatDate(today)}`;
      case 'last30days':
        const month = new Date(today);
        month?.setDate(month?.getDate() - 30);
        return `${formatDate(month)} - ${formatDate(today)}`;
      case 'thisMonth':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return `${formatDate(monthStart)} - ${formatDate(today)}`;
      case 'custom':
        if (selectedRange?.startDate && selectedRange?.endDate) {
          return `${new Date(selectedRange.startDate)?.toLocaleDateString('en-IN')} - ${new Date(selectedRange.endDate)?.toLocaleDateString('en-IN')}`;
        }
        return 'Select custom range';
      default:
        return 'Select date range';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Calendar" size={20} />
          <span>Date Range</span>
        </h3>
        <div className="text-sm text-muted-foreground">
          {getDateRangeText()}
        </div>
      </div>
      <div className="space-y-4">
        <Select
          label="Select Range"
          options={predefinedRanges}
          value={selectedRange?.type || ''}
          onChange={handleRangeChange}
          placeholder="Choose date range"
        />

        {isCustomRange && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <Input
              label="Start Date"
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e?.target?.value)}
              max={customEndDate || new Date()?.toISOString()?.split('T')?.[0]}
            />
            <Input
              label="End Date"
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e?.target?.value)}
              min={customStartDate}
              max={new Date()?.toISOString()?.split('T')?.[0]}
            />
            <div className="md:col-span-2">
              <Button
                onClick={handleCustomRangeApply}
                disabled={!customStartDate || !customEndDate}
                iconName="Check"
                iconPosition="left"
                className="w-full md:w-auto"
              >
                Apply Custom Range
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeSelector;