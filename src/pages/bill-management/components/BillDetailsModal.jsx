import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Modal from '../../../components/ui/Modal';
import StatusBadge from './StatusBadge';

const BillDetailsModal = ({ bill, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [paymentStatus, setPaymentStatus] = useState(bill?.status || 'unpaid');
  const [paymentProof, setPaymentProof] = useState(null);

  if (!bill) return null;

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

  const handleDownloadPDF = () => {
    console.log('Downloading PDF for bill:', bill?.billNumber);
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Bill_${bill?.billNumber}.pdf`;
    link?.click();
  };

  const handleStatusUpdate = () => {
    console.log('Updating status to:', paymentStatus);
    onClose();
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  const statusOptions = [
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'partial', label: 'Partial' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: '2024-12-05',
      amount: 15000,
      method: 'UPI',
      reference: 'UPI123456789',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-11-28',
      amount: 10000,
      method: 'NEFT',
      reference: 'NEFT987654321',
      status: 'completed'
    }
  ];

  const tabs = [
    { id: 'details', label: 'Bill Details', icon: 'FileText' },
    { id: 'payment', label: 'Payment History', icon: 'CreditCard' },
    { id: 'update', label: 'Update Status', icon: 'Edit' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Bill ${bill?.billNumber}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              {tab?.label}
            </button>
          ))}
        </div>

        {/* Bill Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{bill?.tenantName}</h3>
                <p className="text-muted-foreground">{bill?.unitNumber}</p>
              </div>
              <StatusBadge status={bill?.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bill Number</label>
                  <p className="font-mono text-sm font-medium text-primary">{bill?.billNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bill Date</label>
                  <p className="font-medium">{formatDate(bill?.billDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Due Date</label>
                  <p className="font-medium">{formatDate(bill?.dueDate)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rent Amount</label>
                  <p className="text-2xl font-bold font-mono">{formatAmount(bill?.rentAmount)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Extra Charges</label>
                  <p className="font-semibold font-mono">{formatAmount(bill?.extraCharges || 0)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Amount</label>
                  <p className="text-xl font-bold font-mono text-primary">{formatAmount(bill?.amount)}</p>
                </div>
              </div>
            </div>

            {bill?.description && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="mt-1 text-sm">{bill?.description}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={handleDownloadPDF} className="flex-1">
                <Icon name="Download" size={16} className="mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={() => setActiveTab('update')}>
                <Icon name="Edit" size={16} className="mr-2" />
                Update Status
              </Button>
            </div>
          </div>
        )}

        {/* Payment History Tab */}
        {activeTab === 'payment' && (
          <div className="space-y-4">
            <h3 className="font-semibold">Payment History</h3>
            
            {paymentHistory?.length > 0 ? (
              <div className="space-y-3">
                {paymentHistory?.map((payment) => (
                  <div key={payment?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                        <Icon name="CheckCircle" size={20} color="white" />
                      </div>
                      <div>
                        <p className="font-medium">{formatAmount(payment?.amount)}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment?.method} • {payment?.reference}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatDate(payment?.date)}</p>
                      <StatusBadge status={payment?.status} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="CreditCard" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No payment history available</p>
              </div>
            )}
          </div>
        )}

        {/* Update Status Tab */}
        {activeTab === 'update' && (
          <div className="space-y-6">
            <h3 className="font-semibold">Update Payment Status</h3>
            
            <div className="space-y-4">
              <Select
                label="Payment Status"
                options={statusOptions}
                value={paymentStatus}
                onChange={setPaymentStatus}
              />

              <div>
                <label className="block text-sm font-medium mb-2">Upload Payment Proof</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="payment-proof"
                  />
                  <label htmlFor="payment-proof" className="cursor-pointer">
                    <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </label>
                </div>
                
                {paymentProof && (
                  <div className="mt-2 p-3 bg-muted rounded-lg flex items-center gap-3">
                    <Icon name="File" size={20} />
                    <span className="text-sm font-medium">{paymentProof?.name}</span>
                    <button
                      onClick={() => setPaymentProof(null)}
                      className="ml-auto text-muted-foreground hover:text-foreground"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                )}
              </div>

              <Input
                label="Payment Reference (Optional)"
                placeholder="Enter transaction ID or reference number"
              />

              <div className="flex gap-3">
                <Button onClick={handleStatusUpdate} className="flex-1">
                  <Icon name="Save" size={16} className="mr-2" />
                  Update Status
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('details')}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BillDetailsModal;