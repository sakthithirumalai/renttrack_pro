import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TenantSelector from './components/TenantSelector';
import BillingPeriodSelector from './components/BillingPeriodSelector';
import AdditionalCharges from './components/AdditionalCharges';
import BillPreview from './components/BillPreview';
import BillActions from './components/BillActions';

const BillCreation = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Form state
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [billingMonth, setBillingMonth] = useState('');
  const [billingYear, setBillingYear] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [rentAmount, setRentAmount] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState([]);
  const [billNumber, setBillNumber] = useState('');

  // Generate bill number on component mount
  useEffect(() => {
    const generateBillNumber = () => {
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000)?.toString()?.padStart(3, '0');
      return `BILL-${timestamp}-${randomNum}`;
    };
    
    setBillNumber(generateBillNumber());
  }, []);

  // Set default billing period to current month
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = (currentDate?.getMonth() + 1)?.toString()?.padStart(2, '0');
    const currentYear = currentDate?.getFullYear()?.toString();
    
    setBillingMonth(currentMonth);
    setBillingYear(currentYear);
    
    // Set default due date to end of current month
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    setDueDate(lastDayOfMonth?.toISOString()?.split('T')?.[0]);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleTenantSelect = (tenant) => {
    setSelectedTenant(tenant);
  };

  const handleRentAmountChange = (amount) => {
    setRentAmount(amount);
  };

  const handleBillGenerated = (billData) => {
    console.log('Bill generated:', billData);
    // Show success message and redirect to bill management
    alert(`Bill ${billData?.billNumber} generated successfully! Redirecting to Bill Management...`);
    navigate('/bill-management');
  };

  const handleDraftSaved = (draftData) => {
    console.log('Draft saved:', draftData);
    alert('Draft saved successfully! You can continue editing later.');
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Bills', path: '/bill-management' },
    { label: 'Create New', path: '/bill-creation', current: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            {breadcrumbItems?.map((item, index) => (
              <React.Fragment key={item?.path}>
                {index > 0 && <Icon name="ChevronRight" size={16} />}
                {item?.current ? (
                  <span className="text-foreground font-medium">{item?.label}</span>
                ) : (
                  <button
                    onClick={() => navigate(item?.path)}
                    className="hover:text-foreground transition-colors"
                  >
                    {item?.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create New Bill</h1>
              <p className="text-muted-foreground mt-2">
                Generate rent bills for your tenants with automated calculations and PDF export
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => navigate('/bill-management')}
              >
                Back to Bills
              </Button>
              
              <Button
                variant="ghost"
                iconName="HelpCircle"
                iconPosition="left"
                size="sm"
              >
                Help
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Panel - Form */}
            <div className="xl:col-span-7 space-y-8">
              {/* Bill Information Card */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Bill Information</h2>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Bill #{billNumber}
                  </div>
                </div>
                
                <TenantSelector
                  selectedTenant={selectedTenant}
                  onTenantSelect={handleTenantSelect}
                  onRentAmountChange={handleRentAmountChange}
                />
              </div>

              {/* Billing Period Card */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                <BillingPeriodSelector
                  billingMonth={billingMonth}
                  billingYear={billingYear}
                  onMonthChange={setBillingMonth}
                  onYearChange={setBillingYear}
                  dueDate={dueDate}
                  onDueDateChange={setDueDate}
                />
              </div>

              {/* Additional Charges Card */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                <AdditionalCharges
                  charges={additionalCharges}
                  onChargesChange={setAdditionalCharges}
                />
              </div>

              {/* Actions Card - Mobile */}
              <div className="xl:hidden bg-card border border-border rounded-lg p-6 shadow-soft">
                <BillActions
                  selectedTenant={selectedTenant}
                  billingMonth={billingMonth}
                  billingYear={billingYear}
                  dueDate={dueDate}
                  rentAmount={rentAmount}
                  additionalCharges={additionalCharges}
                  onBillGenerated={handleBillGenerated}
                  onDraftSaved={handleDraftSaved}
                />
              </div>
            </div>

            {/* Right Panel - Preview & Actions */}
            <div className="xl:col-span-5 space-y-6">
              {/* Bill Preview */}
              <BillPreview
                selectedTenant={selectedTenant}
                billingMonth={billingMonth}
                billingYear={billingYear}
                dueDate={dueDate}
                rentAmount={rentAmount}
                additionalCharges={additionalCharges}
                billNumber={billNumber}
              />

              {/* Actions - Desktop */}
              <div className="hidden xl:block bg-card border border-border rounded-lg p-6 shadow-soft">
                <BillActions
                  selectedTenant={selectedTenant}
                  billingMonth={billingMonth}
                  billingYear={billingYear}
                  dueDate={dueDate}
                  rentAmount={rentAmount}
                  additionalCharges={additionalCharges}
                  onBillGenerated={handleBillGenerated}
                  onDraftSaved={handleDraftSaved}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <FloatingActionButton onClick={() => {}} />
    </div>
  );
};

export default BillCreation;