import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BillActions = ({ 
  selectedTenant, 
  billingMonth, 
  billingYear, 
  dueDate, 
  rentAmount, 
  additionalCharges,
  onBillGenerated,
  onDraftSaved 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const isFormValid = () => {
    return selectedTenant && 
           billingMonth && 
           billingYear && 
           dueDate && 
           rentAmount > 0 &&
           additionalCharges?.every(charge => 
             charge?.description?.trim() !== '' && 
             charge?.amount !== '' && 
             parseFloat(charge?.amount) >= 0
           );
  };

  const getTotalAmount = () => {
    const additionalTotal = additionalCharges?.reduce((total, charge) => {
      return total + (parseFloat(charge?.amount) || 0);
    }, 0);
    return rentAmount + additionalTotal;
  };

  const handleGenerateBill = async () => {
    if (!isFormValid()) return;

    setIsGenerating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const billData = {
        id: Date.now(),
        billNumber: `BILL-${Date.now()}`,
        tenant: selectedTenant,
        billingPeriod: {
          month: billingMonth,
          year: billingYear
        },
        dueDate,
        rentAmount,
        additionalCharges: additionalCharges?.filter(charge => 
          charge?.description?.trim() !== '' && charge?.amount !== ''
        ),
        totalAmount: getTotalAmount(),
        status: 'Generated',
        createdAt: new Date()?.toISOString()
      };

      onBillGenerated(billData);
    } catch (error) {
      console.error('Error generating bill:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const draftData = {
        id: Date.now(),
        tenant: selectedTenant,
        billingPeriod: {
          month: billingMonth,
          year: billingYear
        },
        dueDate,
        rentAmount,
        additionalCharges,
        status: 'Draft',
        savedAt: new Date()?.toISOString()
      };

      onDraftSaved(draftData);
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSavingDraft(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bill Summary */}
      <div className="bg-muted rounded-lg p-4 border border-border">
        <h4 className="font-semibold text-foreground mb-3">Bill Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monthly Rent:</span>
            <span className="font-medium text-foreground">₹{rentAmount?.toLocaleString('en-IN')}</span>
          </div>
          
          {additionalCharges?.filter(charge => charge?.description && charge?.amount)?.length > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Additional Charges:</span>
              <span className="font-medium text-foreground">
                ₹{additionalCharges?.reduce((total, charge) => 
                  total + (parseFloat(charge?.amount) || 0), 0
                )?.toLocaleString('en-IN')}
              </span>
            </div>
          )}
          
          <hr className="border-border" />
          
          <div className="flex justify-between text-base">
            <span className="font-semibold text-foreground">Total Amount:</span>
            <span className="font-bold text-primary text-lg">
              ₹{getTotalAmount()?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          size="lg"
          iconName="FileText"
          iconPosition="left"
          loading={isGenerating}
          disabled={!isFormValid() || isGenerating || isSavingDraft}
          onClick={handleGenerateBill}
          className="flex-1"
        >
          {isGenerating ? 'Generating Bill...' : 'Generate Bill'}
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          iconName="Save"
          iconPosition="left"
          loading={isSavingDraft}
          disabled={!selectedTenant || isSavingDraft || isGenerating}
          onClick={handleSaveDraft}
          className="flex-1"
        >
          {isSavingDraft ? 'Saving Draft...' : 'Save as Draft'}
        </Button>
      </div>
      {/* Validation Messages */}
      {!isFormValid() && selectedTenant && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Please complete all required fields:</p>
              <ul className="text-sm text-warning mt-1 space-y-1">
                {!billingMonth && <li>• Select billing month</li>}
                {!billingYear && <li>• Select billing year</li>}
                {!dueDate && <li>• Set due date</li>}
                {additionalCharges?.some(charge => 
                  (charge?.description?.trim() === '' && charge?.amount !== '') ||
                  (charge?.description?.trim() !== '' && charge?.amount === '')
                ) && <li>• Complete all additional charge details</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Success Messages */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <p className="text-sm text-success">
            Bill will be automatically saved and can be downloaded as PDF after generation
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillActions;