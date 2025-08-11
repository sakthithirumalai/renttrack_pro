import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TenantTable = ({ 
  tenants, 
  selectedTenants, 
  onSelectTenant, 
  onSelectAll, 
  onEditTenant, 
  onViewTenant, 
  onDeleteTenant,
  sortConfig,
  onSort 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success', text: 'text-success-foreground', label: 'Active' },
      inactive: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Inactive' },
      pending: { bg: 'bg-warning', text: 'text-warning-foreground', label: 'Pending' },
      overdue: { bg: 'bg-error', text: 'text-error-foreground', label: 'Overdue' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="opacity-50" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const handleSort = (column) => {
    onSort(column);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedTenants?.length === tenants?.length && tenants?.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: 'serialNumber', label: 'S.No.' },
                { key: 'name', label: 'Tenant Name' },
                { key: 'contact', label: 'Contact' },
                { key: 'email', label: 'Email' },
                { key: 'propertyAddress', label: 'Property Address' },
                { key: 'rentAmount', label: 'Rent Amount' },
                { key: 'leaseStart', label: 'Lease Start' },
                { key: 'status', label: 'Status' },
                { key: 'actions', label: 'Actions', sortable: false }
              ]?.map((column) => (
                <th 
                  key={column?.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground ${
                    column?.sortable !== false ? 'cursor-pointer hover:text-foreground' : ''
                  }`}
                  onClick={column?.sortable !== false ? () => handleSort(column?.key) : undefined}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column?.label}</span>
                    {column?.sortable !== false && getSortIcon(column?.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tenants?.map((tenant) => (
              <tr 
                key={tenant?.id}
                className={`border-b border-border hover:bg-muted/50 transition-colors ${
                  selectedTenants?.includes(tenant?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(tenant?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedTenants?.includes(tenant?.id)}
                    onChange={() => onSelectTenant(tenant?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {tenant?.serialNumber}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {tenant?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tenant?.name}</p>
                      <p className="text-xs text-muted-foreground">{tenant?.businessName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">{tenant?.contact}</td>
                <td className="px-4 py-3 text-sm text-foreground">{tenant?.email}</td>
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <p className="text-sm text-foreground truncate">{tenant?.propertyAddress}</p>
                    <p className="text-xs text-muted-foreground">{tenant?.city}, {tenant?.state}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-foreground font-mono">
                  {formatCurrency(tenant?.rentAmount)}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {new Date(tenant.leaseStart)?.toLocaleDateString('en-IN')}
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(tenant?.status)}
                </td>
                <td className="px-4 py-3">
                  <div className={`flex items-center space-x-1 transition-opacity ${
                    hoveredRow === tenant?.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewTenant(tenant)}
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditTenant(tenant)}
                      title="Edit Tenant"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteTenant(tenant)}
                      title="Delete Tenant"
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {tenants?.map((tenant) => (
          <div 
            key={tenant?.id}
            className={`bg-card border border-border rounded-lg p-4 ${
              selectedTenants?.includes(tenant?.id) ? 'ring-2 ring-primary/20' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedTenants?.includes(tenant?.id)}
                  onChange={() => onSelectTenant(tenant?.id)}
                  className="rounded border-border"
                />
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {tenant?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{tenant?.name}</p>
                  <p className="text-sm text-muted-foreground">{tenant?.businessName}</p>
                </div>
              </div>
              {getStatusBadge(tenant?.status)}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Serial No:</span>
                <span className="font-medium text-foreground">{tenant?.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact:</span>
                <span className="text-foreground">{tenant?.contact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground truncate ml-2">{tenant?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rent:</span>
                <span className="font-medium text-foreground font-mono">
                  {formatCurrency(tenant?.rentAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lease Start:</span>
                <span className="text-foreground">
                  {new Date(tenant.leaseStart)?.toLocaleDateString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground truncate flex-1 mr-4">
                {tenant?.propertyAddress}, {tenant?.city}
              </p>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewTenant(tenant)}
                >
                  <Icon name="Eye" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditTenant(tenant)}
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteTenant(tenant)}
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {tenants?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No tenants found</h3>
          <p className="text-muted-foreground">Add your first tenant to get started with rent management.</p>
        </div>
      )}
    </div>
  );
};

export default TenantTable;