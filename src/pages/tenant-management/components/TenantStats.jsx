import React from 'react';
import Icon from '../../../components/AppIcon';

const TenantStats = ({ tenants }) => {
  const totalTenants = tenants?.length;
  const activeTenants = tenants?.filter(t => t?.status === 'active')?.length;
  const inactiveTenants = tenants?.filter(t => t?.status === 'inactive')?.length;
  const overdueTenants = tenants?.filter(t => t?.status === 'overdue')?.length;
  const totalRentAmount = tenants?.reduce((sum, tenant) => sum + (tenant?.rentAmount || 0), 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const stats = [
    {
      title: 'Total Tenants',
      value: totalTenants,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+2 this month',
      changeType: 'positive'
    },
    {
      title: 'Active Tenants',
      value: activeTenants,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: `${((activeTenants / totalTenants) * 100)?.toFixed(1)}% of total`,
      changeType: 'neutral'
    },
    {
      title: 'Inactive Tenants',
      value: inactiveTenants,
      icon: 'UserX',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      change: `${((inactiveTenants / totalTenants) * 100)?.toFixed(1)}% of total`,
      changeType: 'neutral'
    },
    {
      title: 'Overdue Payments',
      value: overdueTenants,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: overdueTenants > 0 ? 'Needs attention' : 'All up to date',
      changeType: overdueTenants > 0 ? 'negative' : 'positive'
    },
    {
      title: 'Total Monthly Rent',
      value: formatCurrency(totalRentAmount),
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8.2% from last month',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground font-mono">
                {typeof stat?.value === 'number' && stat?.title !== 'Total Monthly Rent' ? stat?.value?.toLocaleString('en-IN')
                  : stat?.value
                }
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-foreground mb-1">{stat?.title}</p>
            <p className={`text-xs ${
              stat?.changeType === 'positive' ? 'text-success' :
              stat?.changeType === 'negative'? 'text-error' : 'text-muted-foreground'
            }`}>
              {stat?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TenantStats;