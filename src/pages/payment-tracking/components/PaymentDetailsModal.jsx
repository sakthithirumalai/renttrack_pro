import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import PaymentStatusBadge from './PaymentStatusBadge';
import PaymentMethodIcon from './PaymentMethodIcon';
import PaymentProofUpload from './PaymentProofUpload';

const PaymentDetailsModal = ({ isOpen, onClose, payment, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState('details');

  if (!payment) return null;

  const handleEdit = () => {
    setEditData({
      paymentMethod: payment?.paymentMethod,
      paymentDate: payment?.paymentDate,
      amount: payment?.amount,
      reference: payment?.reference || '',
      notes: payment?.notes || ''
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onUpdate) {
        onUpdate(payment?.id, editData);
      }
      
      setIsEditing(false);
      alert('Payment updated successfully!');
    } catch (error) {
      console.error('Failed to update payment:', error);
      alert('Failed to update payment. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const paymentMethodOptions = [
    { value: 'upi', label: 'UPI' },
    { value: 'cash', label: 'Cash' },
    { value: 'neft', label: 'NEFT' },
    { value: 'cheque', label: 'Cheque' }
  ];

  const tabs = [
    { id: 'details', label: 'Payment Details', icon: 'CreditCard' },
    { id: 'proofs', label: 'Payment Proofs', icon: 'FileImage' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const mockHistory = [
    {
      id: 1,
      action: 'Payment Created',
      user: 'System',
      timestamp: '2024-01-15T10:30:00Z',
      details: 'Payment record created for bill #BILL-2024-001'
    },
    {
      id: 2,
      action: 'Status Updated',
      user: 'Property Manager',
      timestamp: '2024-01-16T14:20:00Z',
      details: 'Status changed from Unpaid to Paid'
    },
    {
      id: 3,
      action: 'Proof Uploaded',
      user: 'Property Manager',
      timestamp: '2024-01-16T14:25:00Z',
      details: 'Payment proof document uploaded'
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Payment Details - ${payment?.billNumber}`}
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <PaymentStatusBadge status={payment?.status} />
            <span className="text-sm text-muted-foreground">
              Last updated: {new Date(payment.lastUpdated)?.toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleEdit}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Edit Payment
                </Button>
              </>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }
                `}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Bill Information */}
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Bill Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Bill Number:</span>
                  <p className="font-medium text-foreground">{payment?.billNumber}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tenant:</span>
                  <p className="font-medium text-foreground">{payment?.tenantName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Unit:</span>
                  <p className="font-medium text-foreground">{payment?.unit}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Bill Amount:</span>
                  <p className="font-medium text-foreground">₹{payment?.billAmount?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Payment Details</h4>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <Select
                      label="Payment Method"
                      options={paymentMethodOptions}
                      value={editData?.paymentMethod}
                      onChange={(value) => setEditData({...editData, paymentMethod: value})}
                    />
                    <Input
                      type="date"
                      label="Payment Date"
                      value={editData?.paymentDate}
                      onChange={(e) => setEditData({...editData, paymentDate: e?.target?.value})}
                    />
                    <Input
                      type="number"
                      label="Amount Paid"
                      value={editData?.amount}
                      onChange={(e) => setEditData({...editData, amount: parseFloat(e?.target?.value)})}
                    />
                    <Input
                      type="text"
                      label="Reference Number"
                      placeholder="Transaction/Reference ID"
                      value={editData?.reference}
                      onChange={(e) => setEditData({...editData, reference: e?.target?.value})}
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <PaymentMethodIcon method={payment?.paymentMethod} showLabel />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Payment Date:</span>
                      <span className="font-medium text-foreground">
                        {new Date(payment.paymentDate)?.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Amount Paid:</span>
                      <span className="font-medium text-success">₹{payment?.amount?.toLocaleString()}</span>
                    </div>
                    {payment?.reference && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Reference:</span>
                        <span className="font-medium text-foreground font-mono">{payment?.reference}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Additional Information</h4>
                
                {isEditing ? (
                  <Input
                    type="textarea"
                    label="Notes"
                    placeholder="Add any notes about this payment..."
                    value={editData?.notes}
                    onChange={(e) => setEditData({...editData, notes: e?.target?.value})}
                    rows={4}
                  />
                ) : (
                  <div className="space-y-3">
                    <div>
                      <span className="text-muted-foreground">Notes:</span>
                      <p className="text-sm text-foreground mt-1">
                        {payment?.notes || 'No additional notes'}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <p className="text-sm text-foreground">
                        {new Date(payment.createdAt)?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'proofs' && (
          <div>
            <PaymentProofUpload
              paymentId={payment?.id}
              existingProofs={payment?.proofs || []}
              onUpload={(paymentId, proof) => {
                console.log('Proof uploaded:', paymentId, proof);
                // Handle proof upload
              }}
              onDelete={(paymentId, proofId) => {
                console.log('Proof deleted:', paymentId, proofId);
                // Handle proof deletion
              }}
            />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Payment History</h4>
            <div className="space-y-3">
              {mockHistory?.map((entry) => (
                <div key={entry?.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={14} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-foreground">{entry?.action}</h5>
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp)?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{entry?.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">by {entry?.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PaymentDetailsModal;