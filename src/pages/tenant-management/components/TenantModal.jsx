import React, { useState, useEffect } from 'react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TenantModal = ({ 
  isOpen, 
  onClose, 
  tenant = null, 
  onSave, 
  mode = 'view' // 'view', 'edit', 'create'
}) => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    contact: '',
    email: '',
    propertyAddress: '',
    city: '',
    state: '',
    pincode: '',
    rentAmount: '',
    securityDeposit: '',
    leaseStart: '',
    leaseEnd: '',
    status: 'active',
    propertyType: 'commercial',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'contact', label: 'Contact Info', icon: 'User' },
    { id: 'lease', label: 'Lease Details', icon: 'FileText' },
    { id: 'payment', label: 'Payment History', icon: 'CreditCard' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const propertyTypeOptions = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'office', label: 'Office Space' },
    { value: 'retail', label: 'Retail Shop' },
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'industrial', label: 'Industrial' }
  ];

  const stateOptions = [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' }
  ];

  // Mock payment history data
  const paymentHistory = [
    {
      id: 1,
      month: 'December 2024',
      amount: 25000,
      status: 'paid',
      paidDate: '2024-12-05',
      method: 'UPI',
      transactionId: 'TXN123456789'
    },
    {
      id: 2,
      month: 'November 2024',
      amount: 25000,
      status: 'paid',
      paidDate: '2024-11-03',
      method: 'NEFT',
      transactionId: 'TXN123456788'
    },
    {
      id: 3,
      month: 'October 2024',
      amount: 25000,
      status: 'paid',
      paidDate: '2024-10-02',
      method: 'Cash',
      transactionId: null
    }
  ];

  useEffect(() => {
    if (tenant && isOpen) {
      setFormData({
        name: tenant?.name || '',
        businessName: tenant?.businessName || '',
        contact: tenant?.contact || '',
        email: tenant?.email || '',
        propertyAddress: tenant?.propertyAddress || '',
        city: tenant?.city || '',
        state: tenant?.state || '',
        pincode: tenant?.pincode || '',
        rentAmount: tenant?.rentAmount?.toString() || '',
        securityDeposit: tenant?.securityDeposit?.toString() || '',
        leaseStart: tenant?.leaseStart || '',
        leaseEnd: tenant?.leaseEnd || '',
        status: tenant?.status || 'active',
        propertyType: tenant?.propertyType || 'commercial',
        notes: tenant?.notes || ''
      });
    } else if (!tenant && isOpen) {
      // Reset form for new tenant
      setFormData({
        name: '',
        businessName: '',
        contact: '',
        email: '',
        propertyAddress: '',
        city: '',
        state: '',
        pincode: '',
        rentAmount: '',
        securityDeposit: '',
        leaseStart: '',
        leaseEnd: '',
        status: 'active',
        propertyType: 'commercial',
        notes: ''
      });
    }
    setErrors({});
    setActiveTab('contact');
  }, [tenant, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Tenant name is required';
    if (!formData?.contact?.trim()) newErrors.contact = 'Contact number is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.propertyAddress?.trim()) newErrors.propertyAddress = 'Property address is required';
    if (!formData?.rentAmount) newErrors.rentAmount = 'Rent amount is required';
    if (!formData?.leaseStart) newErrors.leaseStart = 'Lease start date is required';

    // Email validation
    if (formData?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Contact validation
    if (formData?.contact && !/^[6-9]\d{9}$/?.test(formData?.contact)) {
      newErrors.contact = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave({
        ...formData,
        rentAmount: parseFloat(formData?.rentAmount),
        securityDeposit: parseFloat(formData?.securityDeposit) || 0,
        id: tenant?.id || Date.now()
      });
      onClose();
    } catch (error) {
      console.error('Error saving tenant:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { bg: 'bg-success', text: 'text-success-foreground', label: 'Paid' },
      pending: { bg: 'bg-warning', text: 'text-warning-foreground', label: 'Pending' },
      overdue: { bg: 'bg-error', text: 'text-error-foreground', label: 'Overdue' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const renderContactTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Tenant Name"
          type="text"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          error={errors?.name}
          disabled={mode === 'view'}
          required
        />
        <Input
          label="Business Name"
          type="text"
          value={formData?.businessName}
          onChange={(e) => handleInputChange('businessName', e?.target?.value)}
          disabled={mode === 'view'}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Contact Number"
          type="tel"
          value={formData?.contact}
          onChange={(e) => handleInputChange('contact', e?.target?.value)}
          error={errors?.contact}
          disabled={mode === 'view'}
          required
        />
        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          disabled={mode === 'view'}
          required
        />
      </div>

      <Input
        label="Property Address"
        type="text"
        value={formData?.propertyAddress}
        onChange={(e) => handleInputChange('propertyAddress', e?.target?.value)}
        error={errors?.propertyAddress}
        disabled={mode === 'view'}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="City"
          type="text"
          value={formData?.city}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          disabled={mode === 'view'}
        />
        <Select
          label="State"
          options={stateOptions}
          value={formData?.state}
          onChange={(value) => handleInputChange('state', value)}
          disabled={mode === 'view'}
        />
        <Input
          label="Pincode"
          type="text"
          value={formData?.pincode}
          onChange={(e) => handleInputChange('pincode', e?.target?.value)}
          disabled={mode === 'view'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Property Type"
          options={propertyTypeOptions}
          value={formData?.propertyType}
          onChange={(value) => handleInputChange('propertyType', value)}
          disabled={mode === 'view'}
        />
        <Select
          label="Status"
          options={statusOptions}
          value={formData?.status}
          onChange={(value) => handleInputChange('status', value)}
          disabled={mode === 'view'}
        />
      </div>
    </div>
  );

  const renderLeaseTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Monthly Rent Amount"
          type="number"
          value={formData?.rentAmount}
          onChange={(e) => handleInputChange('rentAmount', e?.target?.value)}
          error={errors?.rentAmount}
          disabled={mode === 'view'}
          required
        />
        <Input
          label="Security Deposit"
          type="number"
          value={formData?.securityDeposit}
          onChange={(e) => handleInputChange('securityDeposit', e?.target?.value)}
          disabled={mode === 'view'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Lease Start Date"
          type="date"
          value={formData?.leaseStart}
          onChange={(e) => handleInputChange('leaseStart', e?.target?.value)}
          error={errors?.leaseStart}
          disabled={mode === 'view'}
          required
        />
        <Input
          label="Lease End Date"
          type="date"
          value={formData?.leaseEnd}
          onChange={(e) => handleInputChange('leaseEnd', e?.target?.value)}
          disabled={mode === 'view'}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Additional Notes
        </label>
        <textarea
          value={formData?.notes}
          onChange={(e) => handleInputChange('notes', e?.target?.value)}
          disabled={mode === 'view'}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-muted disabled:cursor-not-allowed"
          placeholder="Any additional notes about the tenant or lease agreement..."
        />
      </div>
    </div>
  );

  const renderPaymentTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-foreground">Payment History</h4>
        <Button variant="outline" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Export
        </Button>
      </div>

      <div className="space-y-3">
        {paymentHistory?.map((payment) => (
          <div key={payment?.id} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Calendar" size={16} color="white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{payment?.month}</p>
                  <p className="text-sm text-muted-foreground">
                    Paid on {new Date(payment.paidDate)?.toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
              {getStatusBadge(payment?.status)}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <p className="font-medium text-foreground font-mono">
                  {formatCurrency(payment?.amount)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Method:</span>
                <p className="font-medium text-foreground">{payment?.method}</p>
              </div>
              {payment?.transactionId && (
                <div>
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <p className="font-medium text-foreground font-mono text-xs">
                    {payment?.transactionId}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {paymentHistory?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CreditCard" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Payment History</h4>
          <p className="text-muted-foreground">Payment records will appear here once rent is collected.</p>
        </div>
      )}
    </div>
  );

  const getModalTitle = () => {
    if (mode === 'create') return 'Add New Tenant';
    if (mode === 'edit') return 'Edit Tenant Details';
    return 'Tenant Details';
  };

  const renderModalFooter = () => {
    if (mode === 'view') {
      return (
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      );
    }

    return (
      <>
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSave} loading={isLoading}>
          {mode === 'create' ? 'Add Tenant' : 'Save Changes'}
        </Button>
      </>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      size="xl"
      footer={renderModalFooter()}
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'contact' && renderContactTab()}
          {activeTab === 'lease' && renderLeaseTab()}
          {activeTab === 'payment' && renderPaymentTab()}
        </div>
      </div>
    </Modal>
  );
};

export default TenantModal;