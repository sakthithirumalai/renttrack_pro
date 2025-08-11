import { api } from './api.js';

export const paymentService = {
  // Get all payments with optional filters
  getAllPayments: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters?.searchTerm) params?.append('search', filters?.searchTerm);
    if (filters?.status) params?.append('status', filters?.status);
    if (filters?.paymentMethod) params?.append('payment_method', filters?.paymentMethod);
    if (filters?.tenant) params?.append('tenant', filters?.tenant);
    if (filters?.dateRange) params?.append('date_range', filters?.dateRange);
    if (filters?.customDateFrom) params?.append('date_from', filters?.customDateFrom);
    if (filters?.customDateTo) params?.append('date_to', filters?.customDateTo);
    if (filters?.sortBy) params?.append('sort_by', filters?.sortBy);
    if (filters?.sortOrder) params?.append('sort_order', filters?.sortOrder);
    if (filters?.page) params?.append('page', filters?.page);
    if (filters?.limit) params?.append('limit', filters?.limit);

    return await api?.get('/payments', Object.fromEntries(params));
  },

  // Get single payment by ID
  getPaymentById: async (paymentId) => {
    return await api?.get(`/payments/${paymentId}`);
  },

  // Create new payment record
  createPayment: async (paymentData) => {
    return await api?.post('/payments', {
      bill_id: paymentData?.billId,
      tenant_id: paymentData?.tenantId,
      amount: paymentData?.amount,
      payment_method: paymentData?.paymentMethod,
      payment_date: paymentData?.paymentDate,
      reference: paymentData?.reference || '',
      notes: paymentData?.notes || '',
      status: paymentData?.status || 'paid',
    });
  },

  // Update payment
  updatePayment: async (paymentId, paymentData) => {
    return await api?.put(`/payments/${paymentId}`, {
      amount: paymentData?.amount,
      payment_method: paymentData?.paymentMethod,
      payment_date: paymentData?.paymentDate,
      reference: paymentData?.reference,
      notes: paymentData?.notes,
      status: paymentData?.status,
    });
  },

  // Delete payment
  deletePayment: async (paymentId) => {
    return await api?.delete(`/payments/${paymentId}`);
  },

  // Upload payment proof
  uploadPaymentProof: async (paymentId, proofFile) => {
    const formData = new FormData();
    formData?.append('proof_file', proofFile);
    formData?.append('payment_id', paymentId);

    return await api?.upload(`/payments/${paymentId}/proof`, formData);
  },

  // Delete payment proof
  deletePaymentProof: async (paymentId, proofId) => {
    return await api?.delete(`/payments/${paymentId}/proof/${proofId}`);
  },

  // Bulk update payment status
  bulkUpdatePaymentStatus: async (paymentIds, status) => {
    return await api?.post('/payments/bulk-update-status', {
      payment_ids: paymentIds,
      status: status,
    });
  },

  // Get payment statistics
  getPaymentStats: async () => {
    return await api?.get('/payments/stats');
  },

  // Export payments
  exportPayments: async (filters = {}, format = 'excel') => {
    const params = new URLSearchParams();
    
    if (filters?.status) params?.append('status', filters?.status);
    if (filters?.paymentMethod) params?.append('payment_method', filters?.paymentMethod);
    if (filters?.dateRange) params?.append('date_range', filters?.dateRange);
    params?.append('format', format);

    return await api?.get('/payments/export', Object.fromEntries(params));
  },

  // Get payment summary for dashboard
  getPaymentSummary: async (period = 'month') => {
    return await api?.get('/payments/summary', { period });
  },

  // Get payment trends for charts
  getPaymentTrends: async (period = '6months') => {
    return await api?.get('/payments/trends', { period });
  },
};

export default paymentService;