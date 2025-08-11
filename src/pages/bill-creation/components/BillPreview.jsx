import React from 'react';
import Icon from '../../../components/AppIcon';

const BillPreview = ({ 
  selectedTenant, 
  billingMonth, 
  billingYear, 
  dueDate, 
  rentAmount, 
  additionalCharges, 
  billNumber 
}) => {
  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months?.[parseInt(monthNumber) - 1] || '';
  };

  const getTotalAdditionalCharges = () => {
    return additionalCharges?.reduce((total, charge) => {
      const amount = parseFloat(charge?.amount) || 0;
      return total + amount;
    }, 0);
  };

  const getTotalAmount = () => {
    return rentAmount + getTotalAdditionalCharges();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const currentDate = new Date()?.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Bill Preview</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Eye" size={16} />
            <span>Live Preview</span>
          </div>
        </div>
        
        {!selectedTenant ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Select a tenant to preview the bill</p>
          </div>
        ) : (
          <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
            {/* Bill Header */}
            <div className="text-center mb-6 pb-4 border-b border-border">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">RENT BILL</h1>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Bill No: <strong>{billNumber}</strong></span>
                <span>Date: <strong>{currentDate}</strong></span>
              </div>
            </div>

            {/* Tenant Details */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Bill To:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">{selectedTenant?.name}</p>
                <p className="text-gray-600">{selectedTenant?.businessName}</p>
                <p className="text-gray-600">Unit: {selectedTenant?.unitNumber}</p>
                <p className="text-gray-600">{selectedTenant?.address}</p>
                <p className="text-gray-600">Contact: {selectedTenant?.contactNumber}</p>
              </div>
            </div>

            {/* Billing Period */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Billing Details:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Billing Period:</span>
                  <p className="font-medium text-gray-800">
                    {billingMonth && billingYear ? `${getMonthName(billingMonth)} ${billingYear}` : 'Not selected'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Due Date:</span>
                  <p className="font-medium text-gray-800">
                    {dueDate ? formatDate(dueDate) : 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            {/* Bill Items */}
            <div className="mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-right text-gray-800">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-gray-800">
                      Monthly Rent - {billingMonth && billingYear ? `${getMonthName(billingMonth)} ${billingYear}` : 'Billing Period'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-800 font-medium">
                      {rentAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  
                  {additionalCharges?.filter(charge => charge?.description && charge?.amount)?.map((charge, index) => (
                    <tr key={charge?.id}>
                      <td className="border border-gray-300 px-4 py-2 text-gray-800">
                        {charge?.description}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right text-gray-800 font-medium">
                        {parseFloat(charge?.amount)?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                  
                  <tr className="bg-gray-100 font-semibold">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">TOTAL AMOUNT</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-gray-800 text-lg">
                      ₹{getTotalAmount()?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Instructions */}
            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Payment Instructions:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Payment is due by {dueDate ? formatDate(dueDate) : 'the due date'}</li>
                <li>Late payment may incur additional charges</li>
                <li>Please retain this bill for your records</li>
                <li>Contact us for any billing queries</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillPreview;