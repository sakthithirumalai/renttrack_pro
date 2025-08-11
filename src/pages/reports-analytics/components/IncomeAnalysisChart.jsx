import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const IncomeAnalysisChart = ({ dateRange }) => {
  const incomeData = [
    { month: 'Jan 2024', income: 185000, target: 200000, growth: 12.5 },
    { month: 'Feb 2024', income: 192000, target: 200000, growth: 8.2 },
    { month: 'Mar 2024', income: 178000, target: 200000, growth: -7.3 },
    { month: 'Apr 2024', income: 205000, target: 200000, growth: 15.2 },
    { month: 'May 2024', income: 198000, target: 200000, growth: -3.4 },
    { month: 'Jun 2024', income: 215000, target: 200000, growth: 8.6 },
    { month: 'Jul 2024', income: 223000, target: 200000, growth: 3.7 },
    { month: 'Aug 2024', income: 210000, target: 200000, growth: -5.8 },
    { month: 'Sep 2024', income: 235000, target: 200000, growth: 11.9 },
    { month: 'Oct 2024', income: 242000, target: 200000, growth: 3.0 },
    { month: 'Nov 2024', income: 228000, target: 200000, growth: -5.8 },
    { month: 'Dec 2024', income: 245800, target: 200000, growth: 7.8 }
  ];

  const totalIncome = incomeData?.reduce((sum, item) => sum + item?.income, 0);
  const averageIncome = totalIncome / incomeData?.length;
  const currentMonthIncome = incomeData?.[incomeData?.length - 1]?.income || 0;
  const previousMonthIncome = incomeData?.[incomeData?.length - 2]?.income || 0;
  const monthlyGrowth = ((currentMonthIncome - previousMonthIncome) / previousMonthIncome * 100)?.toFixed(1);

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
                  ₹{entry?.value?.toLocaleString('en-IN')}
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">Income Analysis</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Monthly Growth</p>
            <p className={`font-semibold ${monthlyGrowth >= 0 ? 'text-success' : 'text-error'}`}>
              {monthlyGrowth >= 0 ? '+' : ''}{monthlyGrowth}%
            </p>
          </div>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Total Income</span>
          </div>
          <p className="text-xl font-bold text-foreground font-mono">
            ₹{totalIncome?.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Average Monthly</span>
          </div>
          <p className="text-xl font-bold text-foreground font-mono">
            ₹{Math.round(averageIncome)?.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Current Month</span>
          </div>
          <p className="text-xl font-bold text-foreground font-mono">
            ₹{currentMonthIncome?.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={incomeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10B981"
              strokeWidth={3}
              fill="url(#incomeGradient)"
              name="Actual Income"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#64748B"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Target"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full" />
          <span className="text-sm text-muted-foreground">Actual Income</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-1 bg-muted-foreground" style={{ borderTop: '2px dashed #64748B' }} />
          <span className="text-sm text-muted-foreground">Target Income</span>
        </div>
      </div>
    </div>
  );
};

export default IncomeAnalysisChart;