import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const CollectionRateMetrics = ({ dateRange }) => {
  const collectionData = [
    { month: 'Jan 2024', target: 200000, collected: 185000, rate: 92.5, overdue: 15000 },
    { month: 'Feb 2024', target: 200000, collected: 192000, rate: 96.0, overdue: 8000 },
    { month: 'Mar 2024', target: 200000, collected: 178000, rate: 89.0, overdue: 22000 },
    { month: 'Apr 2024', target: 200000, collected: 205000, rate: 102.5, overdue: 0 },
    { month: 'May 2024', target: 200000, collected: 198000, rate: 99.0, overdue: 2000 },
    { month: 'Jun 2024', target: 200000, collected: 215000, rate: 107.5, overdue: 0 },
    { month: 'Jul 2024', target: 200000, collected: 223000, rate: 111.5, overdue: 0 },
    { month: 'Aug 2024', target: 200000, collected: 210000, rate: 105.0, overdue: 0 },
    { month: 'Sep 2024', target: 200000, collected: 235000, rate: 117.5, overdue: 0 },
    { month: 'Oct 2024', target: 200000, collected: 242000, rate: 121.0, overdue: 0 },
    { month: 'Nov 2024', target: 200000, collected: 228000, rate: 114.0, overdue: 0 },
    { month: 'Dec 2024', target: 200000, collected: 245800, rate: 122.9, overdue: 0 }
  ];

  const overdueAnalysis = [
    { category: '0-30 days', amount: 45000, count: 8, color: '#F59E0B' },
    { category: '31-60 days', amount: 28000, count: 4, color: '#EF4444' },
    { category: '61-90 days', amount: 15000, count: 2, color: '#DC2626' },
    { category: '90+ days', amount: 8000, count: 1, color: '#991B1B' }
  ];

  const currentMonth = collectionData?.[collectionData?.length - 1];
  const previousMonth = collectionData?.[collectionData?.length - 2];
  const averageRate = (collectionData?.reduce((sum, item) => sum + item?.rate, 0) / collectionData?.length)?.toFixed(1);
  const totalOverdue = overdueAnalysis?.reduce((sum, item) => sum + item?.amount, 0);
  const totalOverdueCount = overdueAnalysis?.reduce((sum, item) => sum + item?.count, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-modal p-3">
          <p className="font-medium text-popover-foreground">{label}</p>
          <div className="space-y-1 mt-2">
            {payload?.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-muted-foreground">{entry?.name}:</span>
                <span className="font-medium text-foreground">
                  {entry?.dataKey === 'rate' ? `${entry?.value}%` : `₹${entry?.value?.toLocaleString('en-IN')}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Target" size={20} className="text-warning" />
        <h3 className="text-lg font-semibold text-foreground">Collection Rate Metrics</h3>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Current Rate</span>
          </div>
          <p className="text-xl font-bold text-foreground">{currentMonth?.rate}%</p>
          <p className="text-xs text-muted-foreground mt-1">
            {currentMonth?.rate > previousMonth?.rate ? '+' : ''}{(currentMonth?.rate - previousMonth?.rate)?.toFixed(1)}% from last month
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Average Rate</span>
          </div>
          <p className="text-xl font-bold text-foreground">{averageRate}%</p>
          <p className="text-xs text-muted-foreground mt-1">12-month average</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-error" />
            <span className="text-sm font-medium text-muted-foreground">Total Overdue</span>
          </div>
          <p className="text-xl font-bold text-foreground font-mono">
            ₹{totalOverdue?.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{totalOverdueCount} bills pending</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">This Month</span>
          </div>
          <p className="text-xl font-bold text-foreground font-mono">
            ₹{currentMonth?.collected?.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Target: ₹{currentMonth?.target?.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Rate Trend */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Collection Rate Trend</h4>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={collectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748B"
                  fontSize={12}
                  tickFormatter={(value) => value?.split(' ')?.[0]}
                />
                <YAxis 
                  stroke="#64748B"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="Collection Rate"
                />
                <Line
                  type="monotone"
                  dataKey={100}
                  stroke="#64748B"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target (100%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overdue Analysis */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Overdue Analysis</h4>
          
          <div className="space-y-3">
            {overdueAnalysis?.map((item, index) => {
              const percentage = ((item?.amount / totalOverdue) * 100)?.toFixed(1);
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item?.color }}
                    />
                    <div>
                      <p className="font-medium text-foreground">{item?.category}</p>
                      <p className="text-sm text-muted-foreground">{item?.count} bills</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium text-foreground">
                      ₹{item?.amount?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-muted-foreground">{percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>

          {totalOverdue === 0 && (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
              <p className="text-success font-medium">No Overdue Payments!</p>
              <p className="text-sm text-muted-foreground">All bills are paid on time</p>
            </div>
          )}
        </div>
      </div>
      {/* Performance Insights */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="TrendingUp" size={16} className="text-success mt-0.5" />
          <div>
            <h5 className="font-medium text-foreground mb-2">Performance Insights</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <ul className="space-y-1">
                <li>• Collection rate improved by {(currentMonth?.rate - previousMonth?.rate)?.toFixed(1)}% this month</li>
                <li>• {collectionData?.filter(item => item?.rate >= 100)?.length} months exceeded target</li>
                <li>• Best performing month: {collectionData?.reduce((max, item) => item?.rate > max?.rate ? item : max)?.month?.split(' ')?.[0]} ({collectionData?.reduce((max, item) => item?.rate > max?.rate ? item : max)?.rate}%)</li>
              </ul>
              <ul className="space-y-1">
                <li>• Average collection time: 2.3 days after due date</li>
                <li>• {Math.round((1 - totalOverdue / (currentMonth?.target * 12)) * 100)}% of annual target achieved</li>
                <li>• Overdue amount reduced by 15% from last quarter</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionRateMetrics;