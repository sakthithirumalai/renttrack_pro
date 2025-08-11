import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Dashboard from './pages/dashboard';
import PaymentTracking from './pages/payment-tracking';
import TenantManagement from './pages/tenant-management';
import BillCreation from './pages/bill-creation';
import ReportsAnalytics from './pages/reports-analytics';
import BillManagement from './pages/bill-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BillCreation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment-tracking" element={<PaymentTracking />} />
        <Route path="/tenant-management" element={<TenantManagement />} />
        <Route path="/bill-creation" element={<BillCreation />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="/bill-management" element={<BillManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
