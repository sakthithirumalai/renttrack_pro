import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentFilters = ({ onFiltersChange, totalPayments, filteredCount }) => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    paymentMethod: 'all',
    status: 'all',
    tenant: 'all',
    searchTerm: '',
    customDateFrom: '',
    customDateTo: ''
  });

  const paymentMethodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'upi', label: 'UPI' },
    { value: 'cash', label: 'Cash' },
    { value: 'neft', label: 'NEFT' },
    { value: 'cheque', label: 'Cheque' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'partial', label: 'Partial' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const tenantOptions = [
    { value: 'all', label: 'All Tenants' },
    { value: 'tech-solutions', label: 'Tech Solutions Pvt Ltd' },
    { value: 'retail-mart', label: 'Retail Mart' },
    { value: 'consulting-group', label: 'Consulting Group' },
    { value: 'fashion-boutique', label: 'Fashion Boutique' },
    { value: 'digital-agency', label: 'Digital Agency' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      dateRange: 'all',
      paymentMethod: 'all',
      status: 'all',
      tenant: 'all',
      searchTerm: '',
      customDateFrom: '',
      customDateTo: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== 'all' && value !== ''
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} className="mr-1" />
            Clear
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Search by tenant, bill number..."
            value={filters?.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Date Range */}
        <div>
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
          
          {filters?.dateRange === 'custom' && (
            <div className="mt-3 space-y-3">
              <Input
                type="date"
                label="From Date"
                value={filters?.customDateFrom}
                onChange={(e) => handleFilterChange('customDateFrom', e?.target?.value)}
              />
              <Input
                type="date"
                label="To Date"
                value={filters?.customDateTo}
                onChange={(e) => handleFilterChange('customDateTo', e?.target?.value)}
              />
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <Select
            label="Payment Method"
            options={paymentMethodOptions}
            value={filters?.paymentMethod}
            onChange={(value) => handleFilterChange('paymentMethod', value)}
          />
        </div>

        {/* Status */}
        <div>
          <Select
            label="Payment Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </div>

        {/* Tenant */}
        <div>
          <Select
            label="Tenant"
            options={tenantOptions}
            value={filters?.tenant}
            onChange={(value) => handleFilterChange('tenant', value)}
            searchable
          />
        </div>

        {/* Results Summary */}
        <div className="pt-4 border-t border-border">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Filter" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Results</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredCount}</span> of{' '}
              <span className="font-medium text-foreground">{totalPayments}</span> payments
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              iconName="Download"
              iconPosition="left"
            >
              Export Filtered Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              iconName="FileText"
              iconPosition="left"
            >
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFilters;