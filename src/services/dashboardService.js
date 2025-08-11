import { api } from './api.js';

export const dashboardService = {
  // Get overall dashboard analytics
  getDashboardAnalytics: async (period = 'month') => {
    return await api?.get('/dashboard/analytics', { period });
  },

  // Get key metrics for dashboard cards
  getKeyMetrics: async () => {
    return await api?.get('/dashboard/metrics');
  },

  // Get income chart data
  getIncomeChartData: async (period = '6months') => {
    return await api?.get('/dashboard/income-chart', { period });
  },

  // Get payment method distribution
  getPaymentMethodChart: async (period = 'month') => {
    return await api?.get('/dashboard/payment-methods', { period });
  },

  // Get recent bills for dashboard table
  getRecentBills: async (limit = 10) => {
    return await api?.get('/dashboard/recent-bills', { limit });
  },

  // Get recent activity
  getRecentActivity: async (limit = 10) => {
    return await api?.get('/dashboard/recent-activity', { limit });
  },

  // Get collection rate trends
  getCollectionRates: async (period = '3months') => {
    return await api?.get('/dashboard/collection-rates', { period });
  },

  // Get tenant performance data
  getTenantPerformance: async (limit = 10) => {
    return await api?.get('/dashboard/tenant-performance', { limit });
  },

  // Get monthly income analysis
  getMonthlyIncomeAnalysis: async (months = 12) => {
    return await api?.get('/dashboard/monthly-income', { months });
  },

  // Get overdue payments summary
  getOverduePayments: async () => {
    return await api?.get('/dashboard/overdue-payments');
  },

  // Get property occupancy rates
  getPropertyOccupancy: async () => {
    return await api?.get('/dashboard/property-occupancy');
  },
};

export default dashboardService;