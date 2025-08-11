import { api } from './api.js';

export const tenantService = {
  // Get all tenants with optional filters
  getAllTenants: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters?.search) params?.append('search', filters?.search);
    if (filters?.status) params?.append('status', filters?.status);
    if (filters?.propertyType) params?.append('property_type', filters?.propertyType);
    if (filters?.city) params?.append('city', filters?.city);
    if (filters?.sortBy) params?.append('sort_by', filters?.sortBy);
    if (filters?.sortOrder) params?.append('sort_order', filters?.sortOrder);
    if (filters?.page) params?.append('page', filters?.page);
    if (filters?.limit) params?.append('limit', filters?.limit);

    return await api?.get('/tenants', Object.fromEntries(params));
  },

  // Get single tenant by ID
  getTenantById: async (tenantId) => {
    return await api?.get(`/tenants/${tenantId}`);
  },

  // Create new tenant
  createTenant: async (tenantData) => {
    return await api?.post('/tenants', {
      name: tenantData?.name,
      business_name: tenantData?.businessName,
      contact: tenantData?.contact,
      email: tenantData?.email,
      property_address: tenantData?.propertyAddress,
      city: tenantData?.city,
      state: tenantData?.state,
      pincode: tenantData?.pincode,
      rent_amount: tenantData?.rentAmount,
      security_deposit: tenantData?.securityDeposit,
      lease_start: tenantData?.leaseStart,
      lease_end: tenantData?.leaseEnd,
      property_type: tenantData?.propertyType,
      status: tenantData?.status || 'active',
      notes: tenantData?.notes || '',
    });
  },

  // Update tenant
  updateTenant: async (tenantId, tenantData) => {
    return await api?.put(`/tenants/${tenantId}`, {
      name: tenantData?.name,
      business_name: tenantData?.businessName,
      contact: tenantData?.contact,
      email: tenantData?.email,
      property_address: tenantData?.propertyAddress,
      city: tenantData?.city,
      state: tenantData?.state,
      pincode: tenantData?.pincode,
      rent_amount: tenantData?.rentAmount,
      security_deposit: tenantData?.securityDeposit,
      lease_start: tenantData?.leaseStart,
      lease_end: tenantData?.leaseEnd,
      property_type: tenantData?.propertyType,
      status: tenantData?.status,
      notes: tenantData?.notes,
    });
  },

  // Delete tenant
  deleteTenant: async (tenantId) => {
    return await api?.delete(`/tenants/${tenantId}`);
  },

  // Bulk update tenants
  bulkUpdateTenants: async (tenantIds, updateData) => {
    return await api?.post('/tenants/bulk-update', {
      tenant_ids: tenantIds,
      update_data: updateData,
    });
  },

  // Get tenant statistics
  getTenantStats: async () => {
    return await api?.get('/tenants/stats');
  },

  // Get tenants summary for dashboard
  getTenantsSummary: async () => {
    return await api?.get('/tenants/summary');
  },
};

export default tenantService;