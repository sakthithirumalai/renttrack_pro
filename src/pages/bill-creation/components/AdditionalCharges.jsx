import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AdditionalCharges = ({ charges, onChargesChange }) => {
  const addCharge = () => {
    const newCharge = {
      id: Date.now(),
      description: '',
      amount: ''
    };
    onChargesChange([...charges, newCharge]);
  };

  const removeCharge = (id) => {
    onChargesChange(charges?.filter(charge => charge?.id !== id));
  };

  const updateCharge = (id, field, value) => {
    onChargesChange(charges?.map(charge => 
      charge?.id === id ? { ...charge, [field]: value } : charge
    ));
  };

  const getTotalAdditionalCharges = () => {
    return charges?.reduce((total, charge) => {
      const amount = parseFloat(charge?.amount) || 0;
      return total + amount;
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Additional Charges</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={addCharge}
        >
          Add Charge
        </Button>
      </div>
      {charges?.length === 0 ? (
        <div className="bg-muted rounded-lg p-6 text-center">
          <Icon name="Plus" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No additional charges added</p>
          <p className="text-sm text-muted-foreground mt-1">
            Click "Add Charge" to include extra fees like maintenance, utilities, etc.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {charges?.map((charge, index) => (
            <div key={charge?.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Charge #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCharge(charge?.id)}
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <Input
                    label="Description"
                    placeholder="e.g., Maintenance fee, Electricity bill"
                    value={charge?.description}
                    onChange={(e) => updateCharge(charge?.id, 'description', e?.target?.value)}
                    required
                  />
                </div>
                
                <div>
                  <Input
                    label="Amount (₹)"
                    type="number"
                    placeholder="0.00"
                    value={charge?.amount}
                    onChange={(e) => updateCharge(charge?.id, 'amount', e?.target?.value)}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          
          {charges?.length > 0 && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-success">Total Additional Charges:</span>
                <span className="text-lg font-semibold text-success">
                  ₹{getTotalAdditionalCharges()?.toLocaleString('en-IN', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdditionalCharges;