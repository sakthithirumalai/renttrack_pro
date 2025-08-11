import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import TenantTable from './components/TenantTable';
import TenantModal from './components/TenantModal';
import TenantToolbar from './components/TenantToolbar';
import TenantStats from './components/TenantStats';
import Icon from '../../components/AppIcon';

const TenantManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create'
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'serialNumber', direction: 'asc' });

  // Mock tenant data
  const [tenants, setTenants] = useState([
    {
      id: 1,
      serialNumber: 'TN001',
      name: 'Rajesh Kumar',
      businessName: 'Kumar Electronics',
      contact: '9876543210',
      email: 'rajesh.kumar@email.com',
      propertyAddress: 'Shop No. 15, Commercial Complex, Sector 18',
      city: 'Noida',
      state: 'uttar-pradesh',
      pincode: '201301',
      rentAmount: 25000,
      securityDeposit: 50000,
      leaseStart: '2024-01-01',
      leaseEnd: '2025-12-31',
      status: 'active',
      propertyType: 'retail',
      notes: 'Reliable tenant, always pays on time'
    },
    {
      id: 2,
      serialNumber: 'TN002',
      name: 'Priya Sharma',
      businessName: 'Sharma Textiles Pvt Ltd',
      contact: '9876543211',
      email: 'priya.sharma@sharmattextiles.com',
      propertyAddress: 'Unit 204, Business Park, Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'maharashtra',
      pincode: '400051',
      rentAmount: 45000,
      securityDeposit: 90000,
      leaseStart: '2023-06-01',
      leaseEnd: '2025-05-31',
      status: 'active',
      propertyType: 'office',
      notes: 'Expanding business, may need additional space'
    },
    {
      id: 3,
      serialNumber: 'TN003',
      name: 'Mohammed Ali',
      businessName: 'Ali Trading Company',
      contact: '9876543212',
      email: 'mohammed.ali@alitrading.com',
      propertyAddress: 'Warehouse 12, Industrial Area Phase 2',
      city: 'Gurgaon',
      state: 'haryana',
      pincode: '122016',
      rentAmount: 35000,
      securityDeposit: 70000,
      leaseStart: '2024-03-01',
      leaseEnd: '2026-02-28',
      status: 'overdue',
      propertyType: 'warehouse',
      notes: 'Payment delayed by 5 days this month'
    },
    {
      id: 4,
      serialNumber: 'TN004',
      name: 'Sunita Patel',
      businessName: 'Patel Pharmaceuticals',
      contact: '9876543213',
      email: 'sunita.patel@patelpharma.com',
      propertyAddress: 'Ground Floor, Medical Complex, Civil Lines',
      city: 'Ahmedabad',
      state: 'gujarat',
      pincode: '380001',
      rentAmount: 30000,
      securityDeposit: 60000,
      leaseStart: '2023-12-01',
      leaseEnd: '2025-11-30',
      status: 'active',
      propertyType: 'commercial',
      notes: 'Medical store, requires proper ventilation'
    },
    {
      id: 5,
      serialNumber: 'TN005',
      name: 'Vikram Singh',
      businessName: 'Singh Auto Parts',
      contact: '9876543214',
      email: 'vikram.singh@singhauto.com',
      propertyAddress: 'Shop 8-9, Auto Market, Karol Bagh',
      city: 'New Delhi',
      state: 'delhi',
      pincode: '110005',
      rentAmount: 28000,
      securityDeposit: 56000,
      leaseStart: '2024-02-01',
      leaseEnd: '2025-01-31',
      status: 'inactive',
      propertyType: 'retail',
      notes: 'Temporarily closed for renovation'
    },
    {
      id: 6,
      serialNumber: 'TN006',
      name: 'Anita Desai',
      businessName: 'Desai Consulting Services',
      contact: '9876543215',
      email: 'anita.desai@desaiconsulting.com',
      propertyAddress: '3rd Floor, IT Park, Electronic City',
      city: 'Bangalore',
      state: 'karnataka',
      pincode: '560100',
      rentAmount: 40000,
      securityDeposit: 80000,
      leaseStart: '2024-01-15',
      leaseEnd: '2026-01-14',
      status: 'active',
      propertyType: 'office',
      notes: 'IT consulting firm, 24/7 access required'
    },
    {
      id: 7,
      serialNumber: 'TN007',
      name: 'Ravi Agarwal',
      businessName: 'Agarwal Sweets & Snacks',
      contact: '9876543216',
      email: 'ravi.agarwal@agarwalsweets.com',
      propertyAddress: 'Corner Shop, Main Market, Lajpat Nagar',
      city: 'New Delhi',
      state: 'delhi',
      pincode: '110024',
      rentAmount: 32000,
      securityDeposit: 64000,
      leaseStart: '2023-10-01',
      leaseEnd: '2025-09-30',
      status: 'pending',
      propertyType: 'retail',
      notes: 'New lease agreement under review'
    },
    {
      id: 8,
      serialNumber: 'TN008',
      name: 'Meera Joshi',
      businessName: 'Joshi Fashion House',
      contact: '9876543217',
      email: 'meera.joshi@joshifashion.com',
      propertyAddress: 'Showroom 2, Fashion Street, Linking Road',
      city: 'Mumbai',
      state: 'maharashtra',
      pincode: '400050',
      rentAmount: 55000,
      securityDeposit: 110000,
      leaseStart: '2024-04-01',
      leaseEnd: '2026-03-31',
      status: 'active',
      propertyType: 'retail',
      notes: 'High-end fashion boutique, premium location'
    }
  ]);

  // Filter and sort tenants
  const filteredAndSortedTenants = useMemo(() => {
    let filtered = tenants;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(tenant =>
        tenant?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        tenant?.businessName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        tenant?.contact?.includes(searchQuery) ||
        tenant?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        tenant?.propertyAddress?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        tenant?.city?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered?.filter(tenant => tenant?.status === statusFilter);
    }

    // Apply property type filter
    if (propertyTypeFilter) {
      filtered = filtered?.filter(tenant => tenant?.propertyType === propertyTypeFilter);
    }

    // Apply sorting
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        // Handle different data types
        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [tenants, searchQuery, statusFilter, propertyTypeFilter, sortConfig]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleAddTenant = () => {
    setSelectedTenant(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditTenant = (tenant) => {
    setSelectedTenant(tenant);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewTenant = (tenant) => {
    setSelectedTenant(tenant);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDeleteTenant = (tenant) => {
    if (window.confirm(`Are you sure you want to delete ${tenant?.name}?`)) {
      setTenants(prev => prev?.filter(t => t?.id !== tenant?.id));
      setSelectedTenants(prev => prev?.filter(id => id !== tenant?.id));
    }
  };

  const handleSaveTenant = (tenantData) => {
    if (modalMode === 'create') {
      const newTenant = {
        ...tenantData,
        id: Date.now(),
        serialNumber: `TN${String(tenants?.length + 1)?.padStart(3, '0')}`
      };
      setTenants(prev => [...prev, newTenant]);
    } else if (modalMode === 'edit') {
      setTenants(prev => prev?.map(t => 
        t?.id === selectedTenant?.id ? { ...t, ...tenantData } : t
      ));
    }
  };

  const handleSelectTenant = (tenantId) => {
    setSelectedTenants(prev => 
      prev?.includes(tenantId) 
        ? prev?.filter(id => id !== tenantId)
        : [...prev, tenantId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTenants?.length === filteredAndSortedTenants?.length) {
      setSelectedTenants([]);
    } else {
      setSelectedTenants(filteredAndSortedTenants?.map(t => t?.id));
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'activate':
        setTenants(prev => prev?.map(t => 
          selectedTenants?.includes(t?.id) ? { ...t, status: 'active' } : t
        ));
        break;
      case 'deactivate':
        setTenants(prev => prev?.map(t => 
          selectedTenants?.includes(t?.id) ? { ...t, status: 'inactive' } : t
        ));
        break;
      case 'export':
        console.log('Exporting selected tenants:', selectedTenants);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedTenants?.length} selected tenants?`)) {
          setTenants(prev => prev?.filter(t => !selectedTenants?.includes(t?.id)));
          setSelectedTenants([]);
        }
        break;
      default:
        break;
    }
  };

  // Clear selections when filters change
  useEffect(() => {
    setSelectedTenants([]);
  }, [searchQuery, statusFilter, propertyTypeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Users" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Tenant Management</h1>
                <p className="text-muted-foreground">
                  Manage your commercial tenants and their lease information
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <TenantStats tenants={tenants} />

          {/* Toolbar */}
          <TenantToolbar
            onAddTenant={handleAddTenant}
            onSearch={setSearchQuery}
            onFilterStatus={setStatusFilter}
            onFilterPropertyType={setPropertyTypeFilter}
            onBulkAction={handleBulkAction}
            selectedCount={selectedTenants?.length}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            propertyTypeFilter={propertyTypeFilter}
          />

          {/* Tenant Table */}
          <TenantTable
            tenants={filteredAndSortedTenants}
            selectedTenants={selectedTenants}
            onSelectTenant={handleSelectTenant}
            onSelectAll={handleSelectAll}
            onEditTenant={handleEditTenant}
            onViewTenant={handleViewTenant}
            onDeleteTenant={handleDeleteTenant}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Results Summary */}
          {filteredAndSortedTenants?.length !== tenants?.length && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Showing {filteredAndSortedTenants?.length} of {tenants?.length} tenants
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          )}
        </div>
      </main>
      {/* Tenant Modal */}
      <TenantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tenant={selectedTenant}
        onSave={handleSaveTenant}
        mode={modalMode}
      />
      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleAddTenant} />
    </div>
  );
};

export default TenantManagement;