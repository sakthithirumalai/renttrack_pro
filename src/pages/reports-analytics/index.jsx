import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import DateRangeSelector from './components/DateRangeSelector';
import ReportTypeToggle from './components/ReportTypeToggle';
import IncomeAnalysisChart from './components/IncomeAnalysisChart';
import PaymentTrendsChart from './components/PaymentTrendsChart';
import TenantPerformanceTable from './components/TenantPerformanceTable';
import CollectionRateMetrics from './components/CollectionRateMetrics';
import AdvancedFilters from './components/AdvancedFilters';
import ExportPanel from './components/ExportPanel';
import Icon from '../../components/AppIcon';

const ReportsAnalytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({ type: 'thisMonth' });
  const [activeReports, setActiveReports] = useState(['income', 'payments', 'tenants', 'collections']);
  const [activeFilters, setActiveFilters] = useState({
    tenantGroups: [],
    propertyTypes: [],
    paymentMethods: [],
    paymentStatus: [],
    amountRange: ''
  });

  useEffect(() => {
    document.title = 'Reports & Analytics - RentTrack Pro';
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
  };

  const handleReportToggle = (reportId) => {
    if (activeReports?.includes(reportId)) {
      setActiveReports(activeReports?.filter(id => id !== reportId));
    } else {
      setActiveReports([...activeReports, reportId]);
    }
  };

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleQuickExport = () => {
    // Quick export functionality
    console.log('Quick export triggered');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <main className="lg:ml-60 pt-16">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
                <p className="text-muted-foreground">
                  Comprehensive financial insights and data-driven property management decisions
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="TrendingUp" size={16} className="text-success" />
                  <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                </div>
                <p className="text-xl font-bold text-foreground font-mono">₹24,58,000</p>
                <p className="text-sm text-success">+12.5% from last period</p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Active Tenants</span>
                </div>
                <p className="text-xl font-bold text-foreground">42</p>
                <p className="text-sm text-muted-foreground">Across 6 properties</p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-muted-foreground">Collection Rate</span>
                </div>
                <p className="text-xl font-bold text-foreground">96.2%</p>
                <p className="text-sm text-success">+2.1% improvement</p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-error" />
                  <span className="text-sm font-medium text-muted-foreground">Pending Amount</span>
                </div>
                <p className="text-xl font-bold text-foreground font-mono">₹96,000</p>
                <p className="text-sm text-error">15 overdue bills</p>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DateRangeSelector 
              onDateRangeChange={handleDateRangeChange}
              selectedRange={selectedDateRange}
            />
            <ReportTypeToggle 
              activeReports={activeReports}
              onReportToggle={handleReportToggle}
            />
          </div>

          {/* Advanced Filters */}
          <div className="mb-8">
            <AdvancedFilters 
              onFiltersChange={handleFiltersChange}
              activeFilters={activeFilters}
            />
          </div>

          {/* Charts and Analytics */}
          <div className="space-y-8">
            {/* Income Analysis */}
            {activeReports?.includes('income') && (
              <IncomeAnalysisChart dateRange={selectedDateRange} />
            )}

            {/* Payment Trends */}
            {activeReports?.includes('payments') && (
              <PaymentTrendsChart dateRange={selectedDateRange} />
            )}

            {/* Collection Rate Metrics */}
            {activeReports?.includes('collections') && (
              <CollectionRateMetrics dateRange={selectedDateRange} />
            )}

            {/* Tenant Performance */}
            {activeReports?.includes('tenants') && (
              <TenantPerformanceTable dateRange={selectedDateRange} />
            )}
          </div>

          {/* Export Panel */}
          <div className="mt-8">
            <ExportPanel 
              dateRange={selectedDateRange}
              activeFilters={activeFilters}
            />
          </div>

          {/* No Reports Selected State */}
          {activeReports?.length === 0 && (
            <div className="text-center py-16">
              <Icon name="BarChart3" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Reports Selected</h3>
              <p className="text-muted-foreground mb-6">
                Select one or more report types above to view analytics and insights.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setActiveReports(['income', 'payments', 'tenants', 'collections'])}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Show All Reports
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <FloatingActionButton onClick={handleQuickExport} />
    </div>
  );
};

export default ReportsAnalytics;