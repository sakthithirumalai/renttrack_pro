import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import BillFilters from './components/BillFilters';
import BillTable from './components/BillTable';
import BulkActions from './components/BulkActions';
import Pagination from './components/Pagination';
import { billService } from '../../services/billService';
import { usePaginatedApi, useMutation } from '../../hooks/useApi';

const BillManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedBills, setSelectedBills] = useState([]);
  const [initialFilters] = useState({
    search: '',
    status: 'all',
    tenant: 'all',
    month: 'all',
    minAmount: '',
    maxAmount: ''
  });

  // Use the paginated API hook for bills data
  const {
    data: bills,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    filters,
    limit: itemsPerPage,
    updateFilters,
    updatePage,
    updateLimit,
    refetch
  } = usePaginatedApi(billService?.getAllBills, initialFilters, 1, 25);

  // Mutation hook for bulk operations
  const { mutate: performBulkOperation, loading: bulkLoading } = useMutation();

  const handleBillSelect = (billId, isSelected) => {
    if (isSelected) {
      setSelectedBills([...selectedBills, billId]);
    } else {
      setSelectedBills(selectedBills?.filter(id => id !== billId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedBills(bills?.map(bill => bill?.id));
    } else {
      setSelectedBills([]);
    }
  };

  const handleBulkAction = async (action) => {
    console.log('Bulk action:', action, 'on bills:', selectedBills);
    
    try {
      switch (action) {
        case 'export-pdf':
          console.log('Exporting PDFs for selected bills');
          break;
        case 'export-excel':
          await performBulkOperation(
            () => billService?.exportBills({ bill_ids: selectedBills }, 'excel'),
            (data) => {
              console.log('Export successful:', data);
              // Handle successful export (e.g., download file)
            },
            (error) => {
              console.error('Export failed:', error);
            }
          );
          break;
        case 'mark-paid':
          await performBulkOperation(
            () => billService?.bulkUpdateBills(selectedBills, { status: 'paid' }),
            () => {
              console.log('Bills marked as paid');
              refetch(); // Refresh the data
            }
          );
          break;
        case 'send-reminder': console.log('Sending payment reminders');
          // Implement reminder functionality
          break;
        default:
          console.log('Unknown action:', action);
      }
    } catch (err) {
      console.error('Bulk action failed:', err);
    }
    
    setSelectedBills([]);
  };

  const handleClearSelection = () => {
    setSelectedBills([]);
  };

  const handleFiltersChange = (newFilters) => {
    updateFilters(newFilters);
    setSelectedBills([]);
  };

  const handleClearFilters = () => {
    updateFilters(initialFilters);
    setSelectedBills([]);
  };

  const handlePageChange = (page) => {
    updatePage(page);
    setSelectedBills([]);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    updateLimit(newItemsPerPage);
    setSelectedBills([]);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStatusCounts = () => {
    if (!bills || bills?.length === 0) {
      return {
        total: 0,
        paid: 0,
        unpaid: 0,
        partial: 0,
        overdue: 0
      };
    }

    const counts = {
      total: bills?.length,
      paid: bills?.filter(bill => bill?.status === 'paid')?.length,
      unpaid: bills?.filter(bill => bill?.status === 'unpaid')?.length,
      partial: bills?.filter(bill => bill?.status === 'partial')?.length,
      overdue: bills?.filter(bill => bill?.status === 'overdue')?.length
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  // Show loading state
  if (loading && bills?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="lg:ml-60 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading bills data...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error && bills?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="lg:ml-60 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="AlertCircle" size={24} className="text-error" />
                </div>
                <p className="text-foreground font-medium mb-2">Failed to load bills</p>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={refetch} variant="outline">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Bill Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage and track all your rental bills efficiently
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Link to="/bill-creation">
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Create Bill
                  </Button>
                </Link>
                <Button variant="outline">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export All
                </Button>
              </div>
            </div>

            {/* Status Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono">{statusCounts?.total}</p>
                    <p className="text-sm text-muted-foreground">Total Bills</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono">{statusCounts?.paid}</p>
                    <p className="text-sm text-muted-foreground">Paid</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-error" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono">{statusCounts?.unpaid}</p>
                    <p className="text-sm text-muted-foreground">Unpaid</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertCircle" size={20} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono">{statusCounts?.partial}</p>
                    <p className="text-sm text-muted-foreground">Partial</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono">{statusCounts?.overdue}</p>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <BillFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedBills?.length}
            onBulkAction={handleBulkAction}
            onClearSelection={handleClearSelection}
            loading={bulkLoading}
          />

          {/* Bills Table */}
          <BillTable
            bills={bills || []}
            selectedBills={selectedBills}
            onBillSelect={handleBillSelect}
            onSelectAll={handleSelectAll}
            onBulkAction={handleBulkAction}
            loading={loading}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </main>
      <FloatingActionButton onClick={() => {}} />
    </div>
  );
};

export default BillManagement;