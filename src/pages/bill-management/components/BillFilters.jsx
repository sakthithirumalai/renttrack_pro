import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BillFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'partial', label: 'Partial' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const tenantOptions = [
    { value: 'all', label: 'All Tenants' },
    { value: 'tech-solutions', label: 'Tech Solutions Pvt Ltd' },
    { value: 'retail-mart', label: 'Retail Mart India' },
    { value: 'consulting-group', label: 'Business Consulting Group' },
    { value: 'digital-agency', label: 'Creative Digital Agency' },
    { value: 'finance-corp', label: 'Finance Corporation Ltd' }
  ];

  const monthOptions = [
    { value: 'all', label: 'All Months' },
    { value: '2024-12', label: 'December 2024' },
    { value: '2024-11', label: 'November 2024' },
    { value: '2024-10', label: 'October 2024' },
    { value: '2024-09', label: 'September 2024' },
    { value: '2024-08', label: 'August 2024' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.status !== 'all') count++;
    if (filters?.tenant !== 'all') count++;
    if (filters?.month !== 'all') count++;
    if (filters?.search) count++;
    if (filters?.minAmount) count++;
    if (filters?.maxAmount) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search and Quick Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by bill number, tenant name, or amount..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Status"
            className="w-full sm:w-40"
          />
          
          <Select
            options={tenantOptions}
            value={filters?.tenant}
            onChange={(value) => handleFilterChange('tenant', value)}
            placeholder="Tenant"
            className="w-full sm:w-48"
          />
          
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Icon name="Filter" size={16} />
            More Filters
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </Button>
        </div>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Month"
              options={monthOptions}
              value={filters?.month}
              onChange={(value) => handleFilterChange('month', value)}
            />
            
            <Input
              label="Min Amount (₹)"
              type="number"
              placeholder="0"
              value={filters?.minAmount}
              onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
            />
            
            <Input
              label="Max Amount (₹)"
              type="number"
              placeholder="100000"
              value={filters?.maxAmount}
              onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
            />
            
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={onClearFilters}
                className="w-full"
              >
                <Icon name="X" size={16} className="mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {filters?.status !== 'all' && (
            <div className="flex items-center gap-1 bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
              Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              <button
                onClick={() => handleFilterChange('status', 'all')}
                className="ml-1 hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
          
          {filters?.tenant !== 'all' && (
            <div className="flex items-center gap-1 bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
              Tenant: {tenantOptions?.find(opt => opt?.value === filters?.tenant)?.label}
              <button
                onClick={() => handleFilterChange('tenant', 'all')}
                className="ml-1 hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
          
          {filters?.month !== 'all' && (
            <div className="flex items-center gap-1 bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
              Month: {monthOptions?.find(opt => opt?.value === filters?.month)?.label}
              <button
                onClick={() => handleFilterChange('month', 'all')}
                className="ml-1 hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BillFilters;