import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import MetricCard from './components/MetricCard';
import IncomeChart from './components/IncomeChart';
import PaymentMethodChart from './components/PaymentMethodChart';
import RecentBillsTable from './components/RecentBillsTable';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Update current time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSidebarToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        
        <main className="lg:ml-60 pt-16 min-h-screen">
          <div className="p-6">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading dashboard data...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      
      <main className="lg:ml-60 pt-16 min-h-screen">
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Welcome back, Property Manager! 👋
                </h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Here's what's happening with your properties today.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/bill-creation">
                  <Button variant="default" iconName="Plus" iconPosition="left">
                    Create Bill
                  </Button>
                </Link>
                <Link to="/reports-analytics">
                  <Button variant="outline" iconName="BarChart3" iconPosition="left">
                    View Reports
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <MetricCard
              title="Total Tenants"
              value="42"
              change="+3 this month"
              changeType="positive"
              icon="Users"
              color="primary"
            />
            <MetricCard
              title="Monthly Income"
              value="₹2,45,800"
              change="+12% from last month"
              changeType="positive"
              icon="TrendingUp"
              color="success"
            />
            <MetricCard
              title="Pending Payments"
              value="₹67,500"
              change="5 bills overdue"
              changeType="negative"
              icon="AlertCircle"
              color="warning"
            />
            <MetricCard
              title="Collection Rate"
              value="87.2%"
              change="+2.1% improvement"
              changeType="positive"
              icon="Target"
              color="success"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <IncomeChart />
            </div>
            <div className="xl:col-span-1">
              <PaymentMethodChart />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/tenant-management" className="group">
                <div className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-muted transition-smooth group-hover:border-primary">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                    <Icon name="UserPlus" size={24} />
                  </div>
                  <span className="text-sm font-medium text-foreground">Add Tenant</span>
                </div>
              </Link>
              
              <Link to="/bill-creation" className="group">
                <div className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-muted transition-smooth group-hover:border-success">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-success group-hover:text-success-foreground transition-smooth">
                    <Icon name="FileText" size={24} />
                  </div>
                  <span className="text-sm font-medium text-foreground">Create Bill</span>
                </div>
              </Link>
              
              <Link to="/payment-tracking" className="group">
                <div className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-muted transition-smooth group-hover:border-accent">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                    <Icon name="CreditCard" size={24} />
                  </div>
                  <span className="text-sm font-medium text-foreground">Record Payment</span>
                </div>
              </Link>
              
              <Link to="/reports-analytics" className="group">
                <div className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-muted transition-smooth group-hover:border-warning">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-warning group-hover:text-warning-foreground transition-smooth">
                    <Icon name="BarChart3" size={24} />
                  </div>
                  <span className="text-sm font-medium text-foreground">View Reports</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Bills Table */}
          <RecentBillsTable />

          {/* Recent Activity */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} color="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Payment Received</p>
                  <p className="text-sm text-muted-foreground">Rajesh Kumar paid ₹15,000 for Shop 101</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="FileText" size={16} color="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">New Bill Created</p>
                  <p className="text-sm text-muted-foreground">Bill RTP-2024-006 generated for Mohammed Ali</p>
                  <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                  <Icon name="AlertCircle" size={16} color="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Payment Overdue</p>
                  <p className="text-sm text-muted-foreground">Priya Sharma's payment is 3 days overdue</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Link to="/reports-analytics">
                <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right" className="w-full">
                  View All Activity
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FloatingActionButton onClick={() => {}} />
    </div>
  );
};

export default Dashboard;