import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFilters = ({ onFiltersChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    tenantGroups: [],
    propertyTypes: [],
    paymentMethods: [],
    paymentStatus: [],
    amountRange: '',
    ...activeFilters
  });

  const tenantGroupOptions = [
    { value: 'commercial', label: 'Commercial Tenants' },
    { value: 'retail', label: 'Retail Tenants' },
    { value: 'office', label: 'Office Tenants' },
    { value: 'warehouse', label: 'Warehouse Tenants' },
    { value: 'mixed', label: 'Mixed Use Tenants' }
  ];

  const propertyTypeOptions = [
    { value: 'shop', label: 'Shop/Retail Space' },
    { value: 'office', label: 'Office Space' },
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'showroom', label: 'Showroom' },
    { value: 'restaurant', label: 'Restaurant/Food Court' }
  ];

  const paymentMethodOptions = [
    { value: 'upi', label: 'UPI' },
    { value: 'neft', label: 'NEFT/Bank Transfer' },
    { value: 'cash', label: 'Cash' },
    { value: 'cheque', label: 'Cheque' },
    { value: 'card', label: 'Credit/Debit Card' }
  ];

  const paymentStatusOptions = [
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'partial', label: 'Partially Paid' }
  ];

  const amountRangeOptions = [
    { value: '', label: 'All Amounts' },
    { value: '0-10000', label: '₹0 - ₹10,000' },
    { value: '10000-25000', label: '₹10,000 - ₹25,000' },
    { value: '25000-50000', label: '₹25,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000+', label: '₹1,00,000+' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (Array.isArray(newFilters?.[filterType])) {
      if (newFilters?.[filterType]?.includes(value)) {
        newFilters[filterType] = newFilters?.[filterType]?.filter(item => item !== value);
      } else {
        newFilters[filterType] = [...newFilters?.[filterType], value];
      }
    } else {
      newFilters[filterType] = value;
    }
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      tenantGroups: [],
      propertyTypes: [],
      paymentMethods: [],
      paymentStatus: [],
      amountRange: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value?.length;
      }
      return count + (value ? 1 : 0);
    }, 0);
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {/* Quick Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Select
          label="Payment Status"
          options={paymentStatusOptions}
          value={filters?.paymentStatus?.[0] || ''}
          onChange={(value) => handleFilterChange('paymentStatus', value)}
          placeholder="All Status"
        />
        
        <Select
          label="Amount Range"
          options={amountRangeOptions}
          value={filters?.amountRange}
          onChange={(value) => handleFilterChange('amountRange', value)}
          placeholder="All Amounts"
        />

        <Select
          label="Payment Method"
          options={paymentMethodOptions}
          value={filters?.paymentMethods?.[0] || ''}
          onChange={(value) => handleFilterChange('paymentMethods', value)}
          placeholder="All Methods"
        />
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 pt-4 border-t border-border">
          {/* Tenant Groups */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Tenant Groups</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tenantGroupOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.tenantGroups?.includes(option?.value)}
                  onChange={() => handleFilterChange('tenantGroups', option?.value)}
                />
              ))}
            </div>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Building2" size={16} />
              <span>Property Types</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {propertyTypeOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.propertyTypes?.includes(option?.value)}
                  onChange={() => handleFilterChange('propertyTypes', option?.value)}
                />
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="CreditCard" size={16} />
              <span>Payment Methods</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {paymentMethodOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.paymentMethods?.includes(option?.value)}
                  onChange={() => handleFilterChange('paymentMethods', option?.value)}
                />
              ))}
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} />
              <span>Payment Status</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {paymentStatusOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.paymentStatus?.includes(option?.value)}
                  onChange={() => handleFilterChange('paymentStatus', option?.value)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-muted-foreground">
              {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied. 
              Charts and tables will update automatically based on your selections.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;