import React from 'react';
import Icon from '../../../components/AppIcon';


const ReportTypeToggle = ({ activeReports, onReportToggle }) => {
  const reportTypes = [
    {
      id: 'income',
      label: 'Income Analysis',
      icon: 'TrendingUp',
      description: 'Revenue trends and collection patterns',
      color: 'text-success'
    },
    {
      id: 'payments',
      label: 'Payment Trends',
      icon: 'CreditCard',
      description: 'Payment method distribution and timing',
      color: 'text-primary'
    },
    {
      id: 'tenants',
      label: 'Tenant Performance',
      icon: 'Users',
      description: 'Individual tenant payment behavior',
      color: 'text-accent'
    },
    {
      id: 'collections',
      label: 'Collection Rates',
      icon: 'Target',
      description: 'Collection efficiency and overdue analysis',
      color: 'text-warning'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BarChart3" size={20} />
        <h3 className="text-lg font-semibold text-foreground">Report Types</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes?.map((report) => {
          const isActive = activeReports?.includes(report?.id);
          
          return (
            <div
              key={report?.id}
              className={`
                relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${isActive 
                  ? 'border-primary bg-primary/5 shadow-soft' 
                  : 'border-border bg-background hover:border-muted-foreground hover:bg-muted/50'
                }
              `}
              onClick={() => onReportToggle(report?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  <Icon name={report?.icon} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium text-sm ${isActive ? 'text-primary' : 'text-foreground'}`}>
                    {report?.label}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {report?.description}
                  </p>
                </div>
              </div>
              {isActive && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>
            Select multiple report types to compare data across different metrics. 
            Active reports: {activeReports?.length}/4
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportTypeToggle;