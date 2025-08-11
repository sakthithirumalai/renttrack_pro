import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PaymentFilters from './components/PaymentFilters';
import PaymentsTable from './components/PaymentsTable';
import PaymentDetailsModal from './components/PaymentDetailsModal';

const PaymentTracking = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filters, setFilters] = useState({});

  // Mock payment data
  const mockPayments = [
    {
      id: 1,
      billNumber: 'BILL-2024-001',
      tenantName: 'Tech Solutions Pvt Ltd',
      tenantEmail: 'contact@techsolutions.com',
      unit: '101',
      billAmount: 25000,
      amount: 25000,
      paymentMethod: 'upi',
      paymentDate: '2024-01-15',
      status: 'paid',
      reference: 'UPI-123456789',
      notes: 'Payment received on time',
      createdAt: '2024-01-01T10:00:00Z',
      lastUpdated: '2024-01-15T14:30:00Z',
      proofs: [
        {
          id: 1,
          fileName: 'payment_proof_jan.jpg',
          fileSize: 245760,
          fileType: 'image/jpeg',
          uploadDate: '2024-01-15T14:35:00Z',
          url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400'
        }
      ]
    },
    {
      id: 2,
      billNumber: 'BILL-2024-002',
      tenantName: 'Retail Mart',
      tenantEmail: 'admin@retailmart.com',
      unit: '205',
      billAmount: 18000,
      amount: 10000,
      paymentMethod: 'neft',
      paymentDate: '2024-01-10',
      status: 'partial',
      reference: 'NEFT-987654321',
      notes: 'Partial payment received, balance pending',
      createdAt: '2024-01-01T10:00:00Z',
      lastUpdated: '2024-01-10T16:20:00Z',
      proofs: []
    },
    {
      id: 3,
      billNumber: 'BILL-2024-003',
      tenantName: 'Consulting Group',
      tenantEmail: 'info@consultinggroup.com',
      unit: '304',
      billAmount: 30000,
      amount: 0,
      paymentMethod: null,
      paymentDate: null,
      status: 'overdue',
      reference: null,
      notes: 'Payment overdue by 5 days',
      createdAt: '2024-01-01T10:00:00Z',
      lastUpdated: '2024-01-01T10:00:00Z',
      proofs: []
    },
    {
      id: 4,
      billNumber: 'BILL-2024-004',
      tenantName: 'Fashion Boutique',
      tenantEmail: 'contact@fashionboutique.com',
      unit: '102',
      billAmount: 22000,
      amount: 22000,
      paymentMethod: 'cash',
      paymentDate: '2024-01-12',
      status: 'paid',
      reference: 'CASH-001',
      notes: 'Cash payment received in office',
      createdAt: '2024-01-01T10:00:00Z',
      lastUpdated: '2024-01-12T11:45:00Z',
      proofs: [
        {
          id: 2,
          fileName: 'cash_receipt.pdf',
          fileSize: 156789,
          fileType: 'application/pdf',
          uploadDate: '2024-01-12T11:50:00Z',
          url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400'
        }
      ]
    },
    {
      id: 5,
      billNumber: 'BILL-2024-005',
      tenantName: 'Digital Agency',
      tenantEmail: 'hello@digitalagency.com',
      unit: '203',
      billAmount: 28000,
      amount: 0,
      paymentMethod: null,
      paymentDate: null,
      status: 'unpaid',
      reference: null,
      notes: 'Awaiting payment',
      createdAt: '2024-01-01T10:00:00Z',
      lastUpdated: '2024-01-01T10:00:00Z',
      proofs: []
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadPayments = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setLoading(false);
    };

    loadPayments();
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    
    let filtered = [...payments];

    // Apply search filter
    if (newFilters?.searchTerm) {
      const searchTerm = newFilters?.searchTerm?.toLowerCase();
      filtered = filtered?.filter(payment => 
        payment?.tenantName?.toLowerCase()?.includes(searchTerm) ||
        payment?.billNumber?.toLowerCase()?.includes(searchTerm) ||
        payment?.reference?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply status filter
    if (newFilters?.status !== 'all') {
      filtered = filtered?.filter(payment => payment?.status === newFilters?.status);
    }

    // Apply payment method filter
    if (newFilters?.paymentMethod !== 'all') {
      filtered = filtered?.filter(payment => payment?.paymentMethod === newFilters?.paymentMethod);
    }

    // Apply tenant filter
    if (newFilters?.tenant !== 'all') {
      const tenantMap = {
        'tech-solutions': 'Tech Solutions Pvt Ltd',
        'retail-mart': 'Retail Mart',
        'consulting-group': 'Consulting Group',
        'fashion-boutique': 'Fashion Boutique',
        'digital-agency': 'Digital Agency'
      };
      const tenantName = tenantMap?.[newFilters?.tenant];
      if (tenantName) {
        filtered = filtered?.filter(payment => payment?.tenantName === tenantName);
      }
    }

    // Apply date range filter
    if (newFilters?.dateRange !== 'all') {
      const now = new Date();
      let startDate;

      switch (newFilters?.dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          const quarterStart = Math.floor(now?.getMonth() / 3) * 3;
          startDate = new Date(now.getFullYear(), quarterStart, 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        case 'custom':
          if (newFilters?.customDateFrom && newFilters?.customDateTo) {
            const fromDate = new Date(newFilters.customDateFrom);
            const toDate = new Date(newFilters.customDateTo);
            filtered = filtered?.filter(payment => {
              if (!payment?.paymentDate) return false;
              const paymentDate = new Date(payment.paymentDate);
              return paymentDate >= fromDate && paymentDate <= toDate;
            });
          }
          break;
        default:
          break;
      }

      if (startDate && newFilters?.dateRange !== 'custom') {
        filtered = filtered?.filter(payment => {
          if (!payment?.paymentDate) return false;
          const paymentDate = new Date(payment.paymentDate);
          return paymentDate >= startDate;
        });
      }
    }

    setFilteredPayments(filtered);
  };

  const handleStatusChange = (paymentId, newStatus) => {
    setPayments(prevPayments =>
      prevPayments?.map(payment =>
        payment?.id === paymentId
          ? { ...payment, status: newStatus, lastUpdated: new Date()?.toISOString() }
          : payment
      )
    );

    // Update filtered payments as well
    setFilteredPayments(prevFiltered =>
      prevFiltered?.map(payment =>
        payment?.id === paymentId
          ? { ...payment, status: newStatus, lastUpdated: new Date()?.toISOString() }
          : payment
      )
    );
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowDetailsModal(true);
  };

  const handleUpdatePayment = (paymentId, updateData) => {
    setPayments(prevPayments =>
      prevPayments?.map(payment =>
        payment?.id === paymentId
          ? { ...payment, ...updateData, lastUpdated: new Date()?.toISOString() }
          : payment
      )
    );

    // Update filtered payments as well
    setFilteredPayments(prevFiltered =>
      prevFiltered?.map(payment =>
        payment?.id === paymentId
          ? { ...payment, ...updateData, lastUpdated: new Date()?.toISOString() }
          : payment
      )
    );

    // Update selected payment if it's the one being updated
    if (selectedPayment?.id === paymentId) {
      setSelectedPayment(prev => ({ ...prev, ...updateData }));
    }
  };

  const handleBulkAction = (action, paymentIds, data) => {
    switch (action) {
      case 'updateStatus':
        paymentIds?.forEach(id => {
          handleStatusChange(id, data?.status);
        });
        break;
      case 'export':
        console.log('Exporting payments:', paymentIds);
        // Implement export functionality
        break;
      default:
        console.log('Unknown bulk action:', action);
    }
  };

  const handleFloatingAction = () => {
    console.log('Record new payment');
    // Navigate to payment recording form or open modal
  };

  // Calculate summary stats
  const totalPayments = payments?.length;
  const paidPayments = payments?.filter(p => p?.status === 'paid')?.length;
  const unpaidPayments = payments?.filter(p => p?.status === 'unpaid')?.length;
  const overduePayments = payments?.filter(p => p?.status === 'overdue')?.length;
  const totalCollected = payments?.filter(p => p?.status === 'paid')?.reduce((sum, p) => sum + p?.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Payment Tracking</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Payment Tracking</h1>
                <p className="text-muted-foreground mt-1">
                  Monitor and manage all rent payments across your properties
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Report
                </Button>
                <Button iconName="Plus" iconPosition="left">
                  Record Payment
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
                  <p className="text-2xl font-bold text-foreground">{totalPayments}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="CreditCard" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Paid</p>
                  <p className="text-2xl font-bold text-success">{paidPayments}</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unpaid</p>
                  <p className="text-2xl font-bold text-warning">{unpaidPayments}</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Collected</p>
                  <p className="text-2xl font-bold text-foreground">₹{totalCollected?.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-secondary" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <PaymentFilters
                onFiltersChange={handleFiltersChange}
                totalPayments={totalPayments}
                filteredCount={filteredPayments?.length}
              />
            </div>

            {/* Payments Table */}
            <div className="lg:col-span-8 xl:col-span-9">
              <PaymentsTable
                payments={filteredPayments}
                loading={loading}
                onStatusChange={handleStatusChange}
                onViewDetails={handleViewDetails}
                onBulkAction={handleBulkAction}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Payment Details Modal */}
      <PaymentDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        payment={selectedPayment}
        onUpdate={handleUpdatePayment}
      />
      <FloatingActionButton onClick={handleFloatingAction} />
    </div>
  );
};

export default PaymentTracking;