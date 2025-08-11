import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Modal from '../../../components/ui/Modal';

const ExportPanel = ({ dateRange, activeFilters }) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportType, setExportType] = useState('summary');
  const [selectedSections, setSelectedSections] = useState([
    'income-analysis',
    'payment-trends',
    'tenant-performance',
    'collection-rates'
  ]);
  const [isExporting, setIsExporting] = useState(false);

  const exportFormatOptions = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet' },
    { value: 'csv', label: 'CSV Data', icon: 'Database' }
  ];

  const exportTypeOptions = [
    { value: 'summary', label: 'Executive Summary' },
    { value: 'detailed', label: 'Detailed Report' },
    { value: 'raw-data', label: 'Raw Data Export' },
    { value: 'custom', label: 'Custom Selection' }
  ];

  const reportSections = [
    { id: 'income-analysis', label: 'Income Analysis', description: 'Revenue trends and growth metrics' },
    { id: 'payment-trends', label: 'Payment Trends', description: 'Payment method distribution and timing' },
    { id: 'tenant-performance', label: 'Tenant Performance', description: 'Individual tenant payment behavior' },
    { id: 'collection-rates', label: 'Collection Rates', description: 'Collection efficiency and overdue analysis' },
    { id: 'financial-summary', label: 'Financial Summary', description: 'Key financial indicators and totals' },
    { id: 'charts-graphs', label: 'Charts & Graphs', description: 'Visual representations of data' }
  ];

  const scheduledReports = [
    { id: 1, name: 'Monthly Executive Summary', frequency: 'Monthly', nextRun: '2025-01-01', recipients: 'admin@renttrack.com' },
    { id: 2, name: 'Weekly Collection Report', frequency: 'Weekly', nextRun: '2024-12-16', recipients: 'manager@renttrack.com' },
    { id: 3, name: 'Quarterly Performance Review', frequency: 'Quarterly', nextRun: '2025-01-01', recipients: 'owner@renttrack.com' }
  ];

  const handleSectionToggle = (sectionId) => {
    if (selectedSections?.includes(sectionId)) {
      setSelectedSections(selectedSections?.filter(id => id !== sectionId));
    } else {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate filename based on selections
    const timestamp = new Date()?.toISOString()?.split('T')?.[0];
    const filename = `renttrack-report-${exportType}-${timestamp}.${exportFormat}`;
    
    // In a real application, this would trigger the actual export
    console.log('Exporting report:', {
      format: exportFormat,
      type: exportType,
      sections: selectedSections,
      dateRange,
      filters: activeFilters,
      filename
    });
    
    setIsExporting(false);
    setIsExportModalOpen(false);
    
    // Show success message (in real app, this would be a toast notification)
    alert(`Report exported successfully as ${filename}`);
  };

  const getExportIcon = (format) => {
    const icons = {
      pdf: 'FileText',
      excel: 'FileSpreadsheet',
      csv: 'Database'
    };
    return icons?.[format] || 'Download';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Download" size={20} />
        <h3 className="text-lg font-semibold text-foreground">Export & Reports</h3>
      </div>
      {/* Quick Export Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {exportFormatOptions?.map((format) => (
          <Button
            key={format?.value}
            variant="outline"
            onClick={() => {
              setExportFormat(format?.value);
              setIsExportModalOpen(true);
            }}
            iconName={format?.icon}
            iconPosition="left"
            className="justify-start"
          >
            Export as {format?.label?.split(' ')?.[0]}
          </Button>
        ))}
      </div>
      {/* Scheduled Reports */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>Scheduled Reports</span>
          </h4>
          <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
            Add Schedule
          </Button>
        </div>

        <div className="space-y-3">
          {scheduledReports?.map((report) => (
            <div key={report?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">{report?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {report?.frequency} • Next: {new Date(report.nextRun)?.toLocaleDateString('en-IN')} • To: {report?.recipients}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Edit" />
                <Button variant="ghost" size="sm" iconName="Trash2" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Exports */}
      <div>
        <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="History" size={16} />
          <span>Recent Exports</span>
        </h4>

        <div className="space-y-2">
          {[
            { name: 'Monthly Summary - December 2024.pdf', date: '2024-12-10', size: '2.4 MB' },
            { name: 'Tenant Performance Report.xlsx', date: '2024-12-08', size: '1.8 MB' },
            { name: 'Payment Data Export.csv', date: '2024-12-05', size: '456 KB' }
          ]?.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Icon name={getExportIcon(file?.name?.split('.')?.pop())} size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">{file?.date} • {file?.size}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" iconName="Download" />
            </div>
          ))}
        </div>
      </div>
      {/* Export Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Export Report"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsExportModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleExport} 
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Exporting...' : 'Export Report'}
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          {/* Export Format */}
          <div>
            <Select
              label="Export Format"
              options={exportFormatOptions?.map(opt => ({ value: opt?.value, label: opt?.label }))}
              value={exportFormat}
              onChange={setExportFormat}
            />
          </div>

          {/* Export Type */}
          <div>
            <Select
              label="Report Type"
              options={exportTypeOptions}
              value={exportType}
              onChange={setExportType}
            />
          </div>

          {/* Custom Sections */}
          {exportType === 'custom' && (
            <div>
              <h5 className="font-medium text-foreground mb-3">Select Sections to Include</h5>
              <div className="space-y-3">
                {reportSections?.map((section) => (
                  <div key={section?.id} className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedSections?.includes(section?.id)}
                      onChange={() => handleSectionToggle(section?.id)}
                    />
                    <div>
                      <p className="font-medium text-foreground">{section?.label}</p>
                      <p className="text-sm text-muted-foreground">{section?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Export Summary */}
          <div className="p-4 bg-muted rounded-lg">
            <h5 className="font-medium text-foreground mb-2">Export Summary</h5>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Format: {exportFormatOptions?.find(opt => opt?.value === exportFormat)?.label}</p>
              <p>• Type: {exportTypeOptions?.find(opt => opt?.value === exportType)?.label}</p>
              <p>• Date Range: {dateRange?.type || 'All Time'}</p>
              <p>• Sections: {exportType === 'custom' ? selectedSections?.length : 'All'}</p>
              <p>• Estimated Size: {exportFormat === 'pdf' ? '2-5 MB' : exportFormat === 'excel' ? '1-3 MB' : '100-500 KB'}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExportPanel;