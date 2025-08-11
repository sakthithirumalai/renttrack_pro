import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TenantToolbar = ({ 
  onAddTenant, 
  onSearch, 
  onFilterStatus, 
  onFilterPropertyType,
  onBulkAction,
  selectedCount = 0,
  searchQuery = '',
  statusFilter = '',
  propertyTypeFilter = ''
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const propertyTypeOptions = [
    { value: '', label: 'All Property Types' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'office', label: 'Office Space' },
    { value: 'retail', label: 'Retail Shop' },
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'industrial', label: 'Industrial' }
  ];

  const bulkActions = [
    { value: 'activate', label: 'Activate Selected', icon: 'CheckCircle' },
    { value: 'deactivate', label: 'Deactivate Selected', icon: 'XCircle' },
    { value: 'export', label: 'Export Selected', icon: 'Download' },
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2', destructive: true }
  ];

  const handleBulkAction = (action) => {
    onBulkAction(action);
    setShowBulkActions(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      {/* Main Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={16} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search tenants by name, contact, or address..."
              value={searchQuery}
              onChange={(e) => onSearch(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-3">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={onFilterStatus}
              placeholder="Filter by status"
              className="min-w-[140px]"
            />
            <Select
              options={propertyTypeOptions}
              value={propertyTypeFilter}
              onChange={onFilterPropertyType}
              placeholder="Filter by type"
              className="min-w-[160px]"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Bulk Actions */}
          {selectedCount > 0 && (
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="relative"
              >
                <Icon name="MoreHorizontal" size={16} className="mr-2" />
                Bulk Actions ({selectedCount})
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedCount}
                </span>
              </Button>

              {showBulkActions && (
                <div className="absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-modal z-50">
                  <div className="py-2">
                    {bulkActions?.map((action) => (
                      <button
                        key={action?.value}
                        onClick={() => handleBulkAction(action?.value)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center space-x-2 ${
                          action?.destructive 
                            ? 'text-error hover:bg-error/10' :'text-popover-foreground'
                        }`}
                      >
                        <Icon name={action?.icon} size={16} />
                        <span>{action?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export All */}
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>

          {/* Add Tenant */}
          <Button onClick={onAddTenant}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Tenant
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {(searchQuery || statusFilter || propertyTypeFilter) && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchQuery && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              <Icon name="Search" size={12} />
              <span>"{searchQuery}"</span>
              <button onClick={() => onSearch('')} className="hover:bg-primary/20 rounded-full p-0.5">
                <Icon name="X" size={10} />
              </button>
            </div>
          )}
          
          {statusFilter && (
            <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs">
              <Icon name="Filter" size={12} />
              <span>{statusOptions?.find(opt => opt?.value === statusFilter)?.label}</span>
              <button onClick={() => onFilterStatus('')} className="hover:bg-secondary/20 rounded-full p-0.5">
                <Icon name="X" size={10} />
              </button>
            </div>
          )}
          
          {propertyTypeFilter && (
            <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
              <Icon name="Building" size={12} />
              <span>{propertyTypeOptions?.find(opt => opt?.value === propertyTypeFilter)?.label}</span>
              <button onClick={() => onFilterPropertyType('')} className="hover:bg-accent/20 rounded-full p-0.5">
                <Icon name="X" size={10} />
              </button>
            </div>
          )}
          
          <button 
            onClick={() => {
              onSearch('');
              onFilterStatus('');
              onFilterPropertyType('');
            }}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default TenantToolbar;