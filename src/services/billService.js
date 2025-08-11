import { api } from './api.js';

export const billService = {
  // Get all bills with optional filters
  getAllBills: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters?.search) params?.append('search', filters?.search);
    if (filters?.status) params?.append('status', filters?.status);
    if (filters?.tenant) params?.append('tenant', filters?.tenant);
    if (filters?.month) params?.append('month', filters?.month);
    if (filters?.minAmount) params?.append('min_amount', filters?.minAmount);
    if (filters?.maxAmount) params?.append('max_amount', filters?.maxAmount);
    if (filters?.sortBy) params?.append('sort_by', filters?.sortBy);
    if (filters?.sortOrder) params?.append('sort_order', filters?.sortOrder);
    if (filters?.page) params?.append('page', filters?.page);
    if (filters?.limit) params?.append('limit', filters?.limit);

    return await api?.get('/bills', Object.fromEntries(params));
  },

  // Get single bill by ID
  getBillById: async (billId) => {
    return await api?.get(`/bills/${billId}`);
  },

  // Create new bill
  createBill: async (billData) => {
    return await api?.post('/bills', {
      tenant_id: billData?.tenantId,
      bill_number: billData?.billNumber,
      rent_amount: billData?.rentAmount,
      extra_charges: billData?.extraCharges || 0,
      total_amount: billData?.amount,
      bill_date: billData?.billDate,
      due_date: billData?.dueDate,
      description: billData?.description || '',
      status: billData?.status || 'unpaid',
    });
  },

  // Update bill
  updateBill: async (billId, billData) => {
    return await api?.put(`/bills/${billId}`, {
      tenant_id: billData?.tenantId,
      rent_amount: billData?.rentAmount,
      extra_charges: billData?.extraCharges,
      total_amount: billData?.amount,
      bill_date: billData?.billDate,
      due_date: billData?.dueDate,
      description: billData?.description,
      status: billData?.status,
    });
  },

  // Delete bill
  deleteBill: async (billId) => {
    return await api?.delete(`/bills/${billId}`);
  },

  // Bulk update bills
  bulkUpdateBills: async (billIds, updateData) => {
    return await api?.post('/bills/bulk-update', {
      bill_ids: billIds,
      update_data: updateData,
    });
  },

  // Get bill statistics
  getBillStats: async () => {
    return await api?.get('/bills/stats');
  },

  // Generate bill PDF
  generateBillPDF: async (billId) => {
    return await api?.get(`/bills/${billId}/pdf`);
  },

  // Send bill reminder
  sendBillReminder: async (billId, reminderData) => {
    return await api?.post(`/bills/${billId}/reminder`, {
      message: reminderData?.message,
      email: reminderData?.email,
      sms: reminderData?.sms || false,
    });
  },

  // Export bills
  exportBills: async (filters = {}, format = 'excel') => {
    const params = new URLSearchParams();
    
    if (filters?.status) params?.append('status', filters?.status);
    if (filters?.tenant) params?.append('tenant', filters?.tenant);
    if (filters?.month) params?.append('month', filters?.month);
    params?.append('format', format);

    return await api?.get('/bills/export', Object.fromEntries(params));
  },

  // Get recent bills for dashboard
  getRecentBills: async (limit = 10) => {
    return await api?.get('/bills/recent', { limit });
  },
};

export default billService;