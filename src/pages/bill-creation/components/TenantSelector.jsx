import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TenantSelector = ({ selectedTenant, onTenantSelect, onRentAmountChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock tenant data
  const tenants = [
    {
      id: 1,
      serialNumber: 'TNT001',
      name: 'Rajesh Kumar',
      businessName: 'Kumar Electronics',
      unitNumber: 'Shop 101',
      rentAmount: 25000,
      contactNumber: '+91 9876543210',
      email: 'rajesh@kumarelectronics.com',
      address: 'Ground Floor, Commercial Complex, Sector 15, Noida'
    },
    {
      id: 2,
      serialNumber: 'TNT002',
      name: 'Priya Sharma',
      businessName: 'Sharma Textiles',
      unitNumber: 'Shop 205',
      rentAmount: 18000,
      contactNumber: '+91 9876543211',
      email: 'priya@sharmatextiles.com',
      address: 'Second Floor, Trade Center, Connaught Place, Delhi'
    },
    {
      id: 3,
      serialNumber: 'TNT003',
      name: 'Mohammed Ali',
      businessName: 'Ali Spices & More',
      unitNumber: 'Shop 150',
      rentAmount: 22000,
      contactNumber: '+91 9876543212',
      email: 'mohammed@alispices.com',
      address: 'First Floor, Spice Market, Chandni Chowk, Delhi'
    },
    {
      id: 4,
      serialNumber: 'TNT004',
      name: 'Sunita Patel',
      businessName: 'Patel Garments',
      unitNumber: 'Shop 78',
      rentAmount: 15000,
      contactNumber: '+91 9876543213',
      email: 'sunita@patelgarments.com',
      address: 'Ground Floor, Fashion Street, Karol Bagh, Delhi'
    },
    {
      id: 5,
      serialNumber: 'TNT005',
      name: 'Vikram Singh',
      businessName: 'Singh Hardware',
      unitNumber: 'Shop 302',
      rentAmount: 28000,
      contactNumber: '+91 9876543214',
      email: 'vikram@singhhardware.com',
      address: 'Third Floor, Hardware Market, Lajpat Nagar, Delhi'
    }
  ];

  const tenantOptions = tenants?.map(tenant => ({
    value: tenant?.id,
    label: `${tenant?.name} - ${tenant?.businessName} (${tenant?.unitNumber})`,
    description: `₹${tenant?.rentAmount?.toLocaleString('en-IN')}/month`
  }));

  const handleTenantChange = (tenantId) => {
    const tenant = tenants?.find(t => t?.id === tenantId);
    if (tenant) {
      onTenantSelect(tenant);
      onRentAmountChange(tenant?.rentAmount);
    }
  };

  const selectedTenantData = selectedTenant ? tenants?.find(t => t?.id === selectedTenant?.id) : null;

  return (
    <div className="space-y-4">
      <Select
        label="Select Tenant"
        description="Choose the tenant for whom you want to create a bill"
        placeholder="Search and select tenant..."
        searchable
        required
        options={tenantOptions}
        value={selectedTenant?.id || ''}
        onChange={handleTenantChange}
        className="mb-4"
      />
      {selectedTenantData && (
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground">{selectedTenantData?.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedTenantData?.businessName}</p>
            </div>
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
              {selectedTenantData?.serialNumber}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Unit:</span>
              <span className="font-medium text-foreground">{selectedTenantData?.unitNumber}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="IndianRupee" size={16} className="text-success" />
              <span className="text-muted-foreground">Monthly Rent:</span>
              <span className="font-semibold text-success">₹{selectedTenantData?.rentAmount?.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Contact:</span>
              <span className="text-foreground">{selectedTenantData?.contactNumber}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span className="text-foreground">{selectedTenantData?.email}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
              <div>
                <span className="text-muted-foreground text-sm">Address:</span>
                <p className="text-foreground text-sm">{selectedTenantData?.address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantSelector;