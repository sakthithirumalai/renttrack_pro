import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentBillsTable = () => {
  const [bills, setBills] = useState([
    {
      id: 'RTP-2024-001',
      tenantName: 'Rajesh Kumar',
      shopNumber: 'Shop 101',
      amount: 15000,
      dueDate: '2024-12-15',
      status: 'paid',
      paymentMethod: 'UPI',
      paidDate: '2024-12-14'
    },
    {
      id: 'RTP-2024-002',
      tenantName: 'Priya Sharma',
      shopNumber: 'Shop 205',
      amount: 18500,
      dueDate: '2024-12-15',
      status: 'overdue',
      paymentMethod: null,
      paidDate: null
    },
    {
      id: 'RTP-2024-003',
      tenantName: 'Mohammed Ali',
      shopNumber: 'Shop 304',
      amount: 22000,
      dueDate: '2024-12-20',
      status: 'pending',
      paymentMethod: null,
      paidDate: null
    },
    {
      id: 'RTP-2024-004',
      tenantName: 'Sunita Patel',
      shopNumber: 'Shop 102',
      amount: 16800,
      dueDate: '2024-12-18',
      status: 'partial',
      paymentMethod: 'Cash',
      paidDate: '2024-12-16'
    },
    {
      id: 'RTP-2024-005',
      tenantName: 'Vikram Singh',
      shopNumber: 'Shop 401',
      amount: 25000,
      dueDate: '2024-12-22',
      status: 'paid',
      paymentMethod: 'NEFT',
      paidDate: '2024-12-20'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { color: 'bg-success text-success-foreground', label: 'Paid', icon: 'CheckCircle' },
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pending', icon: 'Clock' },
      overdue: { color: 'bg-error text-error-foreground', label: 'Overdue', icon: 'AlertCircle' },
      partial: { color: 'bg-accent text-accent-foreground', label: 'Partial', icon: 'MinusCircle' }
    };

    const config = statusConfig?.[status];
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </span>
    );
  };

  const handleStatusUpdate = (billId, newStatus) => {
    setBills(bills?.map(bill => 
      bill?.id === billId 
        ? { ...bill, status: newStatus, paidDate: newStatus === 'paid' ? new Date()?.toISOString()?.split('T')?.[0] : null }
        : bill
    ));
  };

  const filteredBills = filterStatus === 'all' 
    ? bills 
    : bills?.filter(bill => bill?.status === filterStatus);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Bills</h3>
          <p className="text-sm text-muted-foreground">Latest billing activities and payment status</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            iconName="Filter"
            iconPosition="left"
          >
            Filters
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => window.location.href = '/bill-creation'}
          >
            New Bill
          </Button>
        </div>
      </div>
      {/* Filters */}
      {showFilters && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-foreground">Filter by Status:</label>
            <div className="flex items-center space-x-2">
              {['all', 'paid', 'pending', 'overdue', 'partial']?.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth ${
                    filterStatus === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Bill ID</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tenant</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Due Date</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills?.map((bill, index) => (
              <tr key={bill?.id} className={`border-b border-border hover:bg-muted/30 transition-smooth ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                <td className="p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground font-mono">{bill?.id}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{bill?.tenantName}</p>
                    <p className="text-xs text-muted-foreground">{bill?.shopNumber}</p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm font-semibold text-foreground font-mono">₹{bill?.amount?.toLocaleString('en-IN')}</p>
                  {bill?.paymentMethod && (
                    <p className="text-xs text-muted-foreground">via {bill?.paymentMethod}</p>
                  )}
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{formatDate(bill?.dueDate)}</p>
                  {bill?.paidDate && (
                    <p className="text-xs text-success">Paid: {formatDate(bill?.paidDate)}</p>
                  )}
                </td>
                <td className="p-4">
                  {getStatusBadge(bill?.status)}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {bill?.status !== 'paid' && (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleStatusUpdate(bill?.id, 'paid')}
                        iconName="Check"
                        iconPosition="left"
                      >
                        Mark Paid
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Eye"
                      onClick={() => console.log('View bill details:', bill?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Download"
                      onClick={() => console.log('Download bill:', bill?.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredBills?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No bills found for the selected filter.</p>
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
        <p className="text-sm text-muted-foreground">
          Showing {filteredBills?.length} of {bills?.length} bills
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft">
            Previous
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentBillsTable;