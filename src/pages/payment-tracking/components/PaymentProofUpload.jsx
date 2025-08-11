import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PaymentProofUpload = ({ paymentId, existingProofs = [], onUpload, onDelete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = async (files) => {
    const file = files?.[0];
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes?.includes(file?.type)) {
      alert('Please upload only JPG, PNG, or PDF files');
      return;
    }

    // Validate file size (5MB max)
    if (file?.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newProof = {
        id: Date.now(),
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type,
        uploadDate: new Date()?.toISOString(),
        url: URL.createObjectURL(file) // In real app, this would be the server URL
      };

      setUploadProgress(100);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        if (onUpload) {
          onUpload(paymentId, newProof);
        }
      }, 500);

    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
      setUploadProgress(0);
      alert('Upload failed. Please try again.');
    }

    clearInterval(progressInterval);
  };

  const handleDeleteProof = (proofId) => {
    if (window.confirm('Are you sure you want to delete this proof?')) {
      if (onDelete) {
        onDelete(paymentId, proofId);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
          }
          ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef?.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf"
          onChange={handleChange}
          disabled={uploading}
        />

        {uploading ? (
          <div className="space-y-3">
            <Icon name="Upload" size={32} className="mx-auto text-primary animate-pulse" />
            <div>
              <p className="text-sm font-medium text-foreground">Uploading...</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Icon name="Upload" size={32} className="mx-auto text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Drop payment proof here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports JPG, PNG, PDF up to 5MB
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Existing Proofs */}
      {existingProofs?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Uploaded Proofs</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {existingProofs?.map((proof) => (
              <div key={proof?.id} className="bg-muted rounded-lg p-3 flex items-center space-x-3">
                {/* File Preview */}
                <div className="flex-shrink-0">
                  {proof?.fileType?.startsWith('image/') ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
                      <Image
                        src={proof?.url}
                        alt={proof?.fileName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={20} className="text-red-600" />
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {proof?.fileName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(proof?.fileSize)} • {new Date(proof.uploadDate)?.toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      window.open(proof?.url, '_blank');
                    }}
                    title="View proof"
                  >
                    <Icon name="Eye" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleDeleteProof(proof?.id);
                    }}
                    title="Delete proof"
                    className="text-error hover:text-error hover:bg-error/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentProofUpload;