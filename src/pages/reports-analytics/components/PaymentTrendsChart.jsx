import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';

const PaymentTrendsChart = ({ dateRange }) => {
  const paymentMethodData = [
    { method: 'UPI', amount: 1250000, count: 145, color: '#10B981' },
    { method: 'NEFT', amount: 850000, count: 89, color: '#3B82F6' },
    { method: 'Cash', amount: 420000, count: 67, color: '#F59E0B' },
    { method: 'Cheque', amount: 380000, count: 34, color: '#8B5CF6' }
  ];

  const monthlyTrends = [
    { month: 'Jan', upi: 95000, neft: 75000, cash: 35000, cheque: 28000 },
    { month: 'Feb', upi: 102000, neft: 68000, cash: 42000, cheque: 31000 },
    { month: 'Mar', upi: 88000, neft: 82000, cash: 38000, cheque: 25000 },
    { month: 'Apr', upi: 115000, neft: 78000, cash: 45000, cheque: 35000 },
    { month: 'May', upi: 108000, neft: 71000, cash: 41000, cheque: 29000 },
    { month: 'Jun', upi: 125000, neft: 85000, cash: 48000, cheque: 38000 },
    { month: 'Jul', upi: 132000, neft: 89000, cash: 52000, cheque: 42000 },
    { month: 'Aug', upi: 118000, neft: 76000, cash: 39000, cheque: 33000 },
    { month: 'Sep', upi: 145000, neft: 92000, cash: 55000, cheque: 45000 },
    { month: 'Oct', upi: 138000, neft: 87000, cash: 51000, cheque: 41000 },
    { month: 'Nov', upi: 125000, neft: 83000, cash: 47000, cheque: 37000 },
    { month: 'Dec', upi: 159000, neft: 98000, cash: 58000, cheque: 48000 }
  ];

  const totalAmount = paymentMethodData?.reduce((sum, item) => sum + item?.amount, 0);
  const totalTransactions = paymentMethodData?.reduce((sum, item) => sum + item?.count, 0);

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      const percentage = ((data?.amount / totalAmount) * 100)?.toFixed(1);
      
      return (
        <div className="bg-popover border border-border rounded-lg shadow-modal p-3">
          <p className="font-medium text-popover-foreground">{data?.method}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-muted-foreground">
              Amount: <span className="font-medium text-foreground">₹{data?.amount?.toLocaleString('en-IN')}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Transactions: <span className="font-medium text-foreground">{data?.count}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Share: <span className="font-medium text-foreground">{percentage}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-modal p-3">
          <p className="font-medium text-popover-foreground">{label} 2024</p>
          <div className="space-y-1 mt-2">
            {payload?.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-muted-foreground capitalize">{entry?.dataKey}:</span>
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
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="CreditCard" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Payment Trends</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Method Distribution */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Payment Method Distribution</h4>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="DollarSign" size={14} className="text-success" />
                <span className="text-xs font-medium text-muted-foreground">Total Amount</span>
              </div>
              <p className="text-lg font-bold text-foreground font-mono">
                ₹{totalAmount?.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Hash" size={14} className="text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Transactions</span>
              </div>
              <p className="text-lg font-bold text-foreground font-mono">
                {totalTransactions}
              </p>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {paymentMethodData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {paymentMethodData?.map((item) => {
              const percentage = ((item?.amount / totalAmount) * 100)?.toFixed(1);
              return (
                <div key={item?.method} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item?.method} ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Trends */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Monthly Payment Trends</h4>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748B"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748B"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}K`}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="upi" stackId="a" fill="#10B981" name="UPI" />
                <Bar dataKey="neft" stackId="a" fill="#3B82F6" name="NEFT" />
                <Bar dataKey="cash" stackId="a" fill="#F59E0B" name="Cash" />
                <Bar dataKey="cheque" stackId="a" fill="#8B5CF6" name="Cheque" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Key Insights */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div>
            <h5 className="font-medium text-foreground mb-2">Key Insights</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• UPI payments account for {((paymentMethodData?.[0]?.amount / totalAmount) * 100)?.toFixed(1)}% of total revenue</li>
              <li>• Digital payments (UPI + NEFT) represent {(((paymentMethodData?.[0]?.amount + paymentMethodData?.[1]?.amount) / totalAmount) * 100)?.toFixed(1)}% of collections</li>
              <li>• Average transaction value: ₹{Math.round(totalAmount / totalTransactions)?.toLocaleString('en-IN')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTrendsChart;