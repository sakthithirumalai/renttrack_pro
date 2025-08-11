import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const actionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'mark-paid', label: 'Mark as Paid' },
    { value: 'mark-unpaid', label: 'Mark as Unpaid' },
    { value: 'mark-overdue', label: 'Mark as Overdue' },
    { value: 'export-pdf', label: 'Export PDFs' },
    { value: 'export-excel', label: 'Export to Excel' },
    { value: 'send-reminder', label: 'Send Payment Reminder' },
    { value: 'delete', label: 'Delete Bills' }
  ];

  const handleApplyAction = () => {
    if (selectedAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="CheckSquare" size={16} color="white" />
          </div>
          <div>
            <p className="font-medium text-primary">
              {selectedCount} bill{selectedCount > 1 ? 's' : ''} selected
            </p>
            <p className="text-sm text-muted-foreground">
              Choose an action to apply to selected bills
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <Select
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            placeholder="Select Action"
            className="w-48"
          />
          
          <Button
            onClick={handleApplyAction}
            disabled={!selectedAction}
            size="sm"
          >
            <Icon name="Play" size={16} className="mr-2" />
            Apply
          </Button>
          
          <Button
            variant="outline"
            onClick={onClearSelection}
            size="sm"
          >
            <Icon name="X" size={16} className="mr-2" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;