import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';
import BillDetailsModal from './BillDetailsModal';

const BillTable = ({ bills, selectedBills, onBillSelect, onSelectAll, onBulkAction }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'billDate', direction: 'desc' });
  const [selectedBill, setSelectedBill] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedBills = () => {
    const sortedBills = [...bills]?.sort((a, b) => {
      if (sortConfig?.key === 'amount') {
        return sortConfig?.direction === 'asc' 
          ? a?.amount - b?.amount 
          : b?.amount - a?.amount;
      }
      
      if (sortConfig?.key === 'billDate' || sortConfig?.key === 'dueDate') {
        return sortConfig?.direction === 'asc'
          ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
          : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
      }
      
      const aValue = a?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
      const bValue = b?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
      
      return sortConfig?.direction === 'asc'
        ? aValue?.localeCompare(bValue)
        : bValue?.localeCompare(aValue);
    });
    
    return sortedBills;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const handleDownloadPDF = (bill) => {
    console.log('Downloading PDF for bill:', bill?.billNumber);
    // Mock PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Bill_${bill?.billNumber}.pdf`;
    link?.click();
  };

  const handleUpdateStatus = (bill, newStatus) => {
    console.log('Updating status for bill:', bill?.billNumber, 'to:', newStatus);
  };

  const sortedBills = getSortedBills();
  const allSelected = bills?.length > 0 && selectedBills?.length === bills?.length;
  const someSelected = selectedBills?.length > 0 && selectedBills?.length < bills?.length;

  const SortButton = ({ column, children }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center gap-1 font-medium text-left hover:text-primary transition-colors"
    >
      {children}
      <Icon 
        name={sortConfig?.key === column 
          ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown')
          : 'ChevronsUpDown'
        } 
        size={14} 
      />
    </button>
  );

  return (
    <>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={(e) => onSelectAll(e?.target?.checked)}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left p-4">
                  <SortButton column="billNumber">Bill Number</SortButton>
                </th>
                <th className="text-left p-4">
                  <SortButton column="tenantName">Tenant</SortButton>
                </th>
                <th className="text-left p-4">
                  <SortButton column="amount">Amount</SortButton>
                </th>
                <th className="text-left p-4">
                  <SortButton column="billDate">Bill Date</SortButton>
                </th>
                <th className="text-left p-4">
                  <SortButton column="dueDate">Due Date</SortButton>
                </th>
                <th className="text-left p-4">
                  <SortButton column="status">Status</SortButton>
                </th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBills?.map((bill, index) => (
                <tr 
                  key={bill?.id}
                  className={`border-t border-border hover:bg-muted/50 transition-colors cursor-pointer ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  }`}
                  onClick={() => setSelectedBill(bill)}
                >
                  <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedBills?.includes(bill?.id)}
                      onChange={(e) => onBillSelect(bill?.id, e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4 font-mono text-sm font-medium text-primary">
                    {bill?.billNumber}
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{bill?.tenantName}</div>
                      <div className="text-sm text-muted-foreground">{bill?.unitNumber}</div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold font-mono">
                    {formatAmount(bill?.amount)}
                  </td>
                  <td className="p-4 text-sm">
                    {formatDate(bill?.billDate)}
                  </td>
                  <td className="p-4 text-sm">
                    {formatDate(bill?.dueDate)}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={bill?.status} />
                  </td>
                  <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadPDF(bill)}
                        title="Download PDF"
                      >
                        <Icon name="Download" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedBill(bill)}
                        title="View Details"
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      {bill?.status !== 'paid' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdateStatus(bill, 'paid')}
                          title="Mark as Paid"
                        >
                          <Icon name="CheckCircle" size={16} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="lg:hidden">
          {sortedBills?.map((bill) => (
            <div 
              key={bill?.id}
              className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedBills?.includes(bill?.id)}
                    onChange={(e) => onBillSelect(bill?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                  <div>
                    <div className="font-mono text-sm font-medium text-primary">
                      {bill?.billNumber}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(bill?.billDate)}
                    </div>
                  </div>
                </div>
                <StatusBadge status={bill?.status} />
              </div>
              
              <div className="mb-3">
                <div className="font-medium">{bill?.tenantName}</div>
                <div className="text-sm text-muted-foreground">{bill?.unitNumber}</div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold font-mono text-lg">
                  {formatAmount(bill?.amount)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Due: {formatDate(bill?.dueDate)}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBill(bill)}
                  className="flex-1"
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadPDF(bill)}
                >
                  <Icon name="Download" size={16} />
                </Button>
                {bill?.status !== 'paid' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(bill, 'paid')}
                  >
                    <Icon name="CheckCircle" size={16} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bills?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No bills found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or create a new bill to get started.
            </p>
          </div>
        )}
      </div>
      {/* Bill Details Modal */}
      {selectedBill && (
        <BillDetailsModal
          bill={selectedBill}
          isOpen={!!selectedBill}
          onClose={() => setSelectedBill(null)}
        />
      )}
    </>
  );
};

export default BillTable;