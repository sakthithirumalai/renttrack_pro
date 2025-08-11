import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

import PaymentMethodIcon from './PaymentMethodIcon';
import PaymentStatusDropdown from './PaymentStatusDropdown';

const PaymentsTable = ({ 
  payments, 
  onStatusChange, 
  onViewDetails, 
  onBulkAction,
  loading = false 
}) => {
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'paymentDate', direction: 'desc' });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedPayments(payments?.map(p => p?.id));
    } else {
      setSelectedPayments([]);
    }
  };

  const handleSelectPayment = (paymentId, checked) => {
    if (checked) {
      setSelectedPayments([...selectedPayments, paymentId]);
    } else {
      setSelectedPayments(selectedPayments?.filter(id => id !== paymentId));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPayments = React.useMemo(() => {
    let sortablePayments = [...payments];
    if (sortConfig?.key) {
      sortablePayments?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePayments;
  }, [payments, sortConfig]);

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-foreground" />
      : <Icon name="ArrowDown" size={14} className="text-foreground" />;
  };

  const handleBulkStatusUpdate = (newStatus) => {
    if (selectedPayments?.length === 0) return;
    
    if (onBulkAction) {
      onBulkAction('updateStatus', selectedPayments, { status: newStatus });
    }
    setSelectedPayments([]);
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border">
        <div className="p-8 text-center">
          <Icon name="Loader2" size={32} className="mx-auto text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading payments...</p>
        </div>
      </div>
    );
  }

  if (payments?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border">
        <div className="p-8 text-center">
          <Icon name="CreditCard" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No payments found</h3>
          <p className="text-muted-foreground">No payments match your current filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedPayments?.length > 0 && (
        <div className="bg-primary/5 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedPayments?.length} payment{selectedPayments?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('paid')}
              >
                Mark as Paid
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('unpaid')}
              >
                Mark as Unpaid
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction && onBulkAction('export', selectedPayments)}
              >
                <Icon name="Download" size={16} className="mr-1" />
                Export
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPayments([])}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedPayments?.length === payments?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('billNumber')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary"
                >
                  <span>Bill Details</span>
                  {getSortIcon('billNumber')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('tenantName')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary"
                >
                  <span>Tenant</span>
                  {getSortIcon('tenantName')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary"
                >
                  <span>Amount</span>
                  {getSortIcon('amount')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('paymentMethod')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary"
                >
                  <span>Method</span>
                  {getSortIcon('paymentMethod')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('paymentDate')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary"
                >
                  <span>Payment Date</span>
                  {getSortIcon('paymentDate')}
                </button>
              </th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments?.map((payment, index) => (
              <tr 
                key={payment?.id} 
                className={`
                  border-b border-border hover:bg-muted/30 transition-colors
                  ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}
                `}
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedPayments?.includes(payment?.id)}
                    onChange={(e) => handleSelectPayment(payment?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{payment?.billNumber}</p>
                    <p className="text-sm text-muted-foreground">Unit {payment?.unit}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{payment?.tenantName}</p>
                    <p className="text-sm text-muted-foreground">{payment?.tenantEmail}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">₹{payment?.amount?.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      of ₹{payment?.billAmount?.toLocaleString()}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <PaymentMethodIcon method={payment?.paymentMethod} showLabel />
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {payment?.paymentDate ? new Date(payment.paymentDate)?.toLocaleDateString() : '-'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {payment?.paymentDate ? new Date(payment.paymentDate)?.toLocaleTimeString() : 'Not paid'}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <PaymentStatusDropdown
                    currentStatus={payment?.status}
                    paymentId={payment?.id}
                    onStatusChange={onStatusChange}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails && onViewDetails(payment)}
                      title="View details"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log('Record payment for:', payment?.id)}
                      title="Record payment"
                      className="text-success hover:text-success hover:bg-success/10"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log('More actions for:', payment?.id)}
                      title="More actions"
                    >
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTable;