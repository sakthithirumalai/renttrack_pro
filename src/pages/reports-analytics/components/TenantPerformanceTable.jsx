import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TenantPerformanceTable = ({ dateRange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('totalPaid');
  const [sortOrder, setSortOrder] = useState('desc');

  const tenantData = [
    {
      id: 'T001',
      name: 'Rajesh Kumar',
      unit: 'Unit 101',
      totalBills: 12,
      paidBills: 12,
      totalAmount: 180000,
      paidAmount: 180000,
      pendingAmount: 0,
      avgPaymentDelay: 0,
      paymentScore: 100,
      lastPayment: '2024-12-05',
      status: 'excellent'
    },
    {
      id: 'T002',
      name: 'Priya Sharma',
      unit: 'Unit 205',
      totalBills: 12,
      paidBills: 11,
      totalAmount: 240000,
      paidAmount: 220000,
      pendingAmount: 20000,
      avgPaymentDelay: 3,
      paymentScore: 92,
      lastPayment: '2024-11-28',
      status: 'good'
    },
    {
      id: 'T003',
      name: 'Tech Solutions Pvt Ltd',
      unit: 'Unit 304-306',
      totalBills: 12,
      paidBills: 10,
      totalAmount: 450000,
      paidAmount: 375000,
      pendingAmount: 75000,
      avgPaymentDelay: 8,
      paymentScore: 83,
      lastPayment: '2024-11-15',
      status: 'average'
    },
    {
      id: 'T004',
      name: 'Mumbai Traders',
      unit: 'Unit 102',
      totalBills: 12,
      paidBills: 8,
      totalAmount: 192000,
      paidAmount: 128000,
      pendingAmount: 64000,
      avgPaymentDelay: 15,
      paymentScore: 67,
      lastPayment: '2024-10-20',
      status: 'poor'
    },
    {
      id: 'T005',
      name: 'Anita Enterprises',
      unit: 'Unit 203',
      totalBills: 12,
      paidBills: 12,
      totalAmount: 216000,
      paidAmount: 216000,
      pendingAmount: 0,
      avgPaymentDelay: 1,
      paymentScore: 98,
      lastPayment: '2024-12-03',
      status: 'excellent'
    },
    {
      id: 'T006',
      name: 'Digital Marketing Hub',
      unit: 'Unit 401',
      totalBills: 12,
      paidBills: 9,
      totalAmount: 300000,
      paidAmount: 225000,
      pendingAmount: 75000,
      avgPaymentDelay: 12,
      paymentScore: 75,
      lastPayment: '2024-11-08',
      status: 'average'
    }
  ];

  const getStatusBadge = (status, score) => {
    const statusConfig = {
      excellent: { color: 'bg-success text-success-foreground', label: 'Excellent' },
      good: { color: 'bg-primary text-primary-foreground', label: 'Good' },
      average: { color: 'bg-warning text-warning-foreground', label: 'Average' },
      poor: { color: 'bg-error text-error-foreground', label: 'Poor' }
    };

    const config = statusConfig?.[status] || statusConfig?.average;
    
    return (
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
          {config?.label}
        </span>
        <span className="text-sm font-mono text-muted-foreground">
          {score}%
        </span>
      </div>
    );
  };

  const getPaymentDelayIndicator = (days) => {
    if (days === 0) return <span className="text-success font-medium">On Time</span>;
    if (days <= 5) return <span className="text-warning font-medium">{days} days</span>;
    return <span className="text-error font-medium">{days} days</span>;
  };

  const filteredAndSortedData = tenantData?.filter(tenant => 
      tenant?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      tenant?.unit?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )?.sort((a, b) => {
      const aValue = a?.[sortBy];
      const bValue = b?.[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'totalAmount', label: 'Total Amount' },
    { value: 'paidAmount', label: 'Paid Amount' },
    { value: 'pendingAmount', label: 'Pending Amount' },
    { value: 'paymentScore', label: 'Payment Score' },
    { value: 'avgPaymentDelay', label: 'Avg Delay' }
  ];

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const totalRevenue = tenantData?.reduce((sum, tenant) => sum + tenant?.totalAmount, 0);
  const totalCollected = tenantData?.reduce((sum, tenant) => sum + tenant?.paidAmount, 0);
  const totalPending = tenantData?.reduce((sum, tenant) => sum + tenant?.pendingAmount, 0);
  const collectionRate = ((totalCollected / totalRevenue) * 100)?.toFixed(1);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Users" size={20} className="text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Tenant Performance</h3>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Building2" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Tenants</span>
          </div>
          <p className="text-xl font-bold text-foreground">{tenantData?.length}</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Collected</span>
          </div>
          <p className="text-xl font-bold text-foreground font-mono">
            ₹{totalCollected?.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Pending</span>
          </div>
          <p className="text-xl font-bold text-foreground font-mono">
            ₹{totalPending?.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Collection Rate</span>
          </div>
          <p className="text-xl font-bold text-foreground">{collectionRate}%</p>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search by tenant name or unit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            iconName="Search"
          />
        </div>
        <div className="flex gap-2">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
            className="w-40"
          />
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
            iconPosition="left"
          >
            {sortOrder === 'asc' ? 'Asc' : 'Desc'}
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Tenant</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Unit</th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('totalAmount')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto"
                >
                  <span>Total Amount</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('paidAmount')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto"
                >
                  <span>Paid</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('pendingAmount')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto"
                >
                  <span>Pending</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">Avg Delay</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('paymentScore')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors mx-auto"
                >
                  <span>Performance</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">Last Payment</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData?.map((tenant, index) => (
              <tr 
                key={tenant?.id} 
                className={`border-b border-border hover:bg-muted/50 transition-colors ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                }`}
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-foreground">{tenant?.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {tenant?.id}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-foreground">{tenant?.unit}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="font-mono text-foreground">
                    ₹{tenant?.totalAmount?.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="font-mono text-success">
                    ₹{tenant?.paidAmount?.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`font-mono ${tenant?.pendingAmount > 0 ? 'text-error' : 'text-muted-foreground'}`}>
                    ₹{tenant?.pendingAmount?.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  {getPaymentDelayIndicator(tenant?.avgPaymentDelay)}
                </td>
                <td className="py-4 px-4 text-center">
                  {getStatusBadge(tenant?.status, tenant?.paymentScore)}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm text-muted-foreground">
                    {new Date(tenant.lastPayment)?.toLocaleDateString('en-IN')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredAndSortedData?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No tenants found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TenantPerformanceTable;