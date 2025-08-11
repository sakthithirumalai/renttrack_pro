// Centralized error handling utilities
export const errorHandler = {
  // Handle API errors
  handleApiError: (error, defaultMessage = 'An error occurred') => {
    console.error('API Error:', error);
    
    if (error?.response) {
      // Server responded with error status
      const status = error?.response?.status;
      const message = error?.response?.data?.message || error?.response?.data?.error;
      
      switch (status) {
        case 400:
          return message || 'Bad request - please check your input';
        case 401:
          return 'Unauthorized - please check your API credentials';
        case 403:
          return 'Forbidden - you don\'t have permission for this action';
        case 404:
          return 'Resource not found';
        case 422:
          return message || 'Validation failed - please check your input';
        case 429:
          return 'Too many requests - please try again later';
        case 500:
          return 'Server error - please try again later';
        case 503:
          return 'Service unavailable - please try again later';
        default:
          return message || defaultMessage;
      }
    } else if (error?.request) {
      // Network error
      return 'Network error - please check your internet connection';
    } else {
      // Other errors
      return error?.message || defaultMessage;
    }
  },

  // Handle validation errors
  handleValidationError: (errors) => {
    if (Array.isArray(errors)) {
      return errors?.map(err => err?.message || err)?.join(', ');
    } else if (typeof errors === 'object') {
      return Object.values(errors)?.flat()?.join(', ');
    } else {
      return errors?.toString() || 'Validation error';
    }
  },

  // Show user-friendly error messages
  formatErrorMessage: (error, context = '') => {
    const message = errorHandler?.handleApiError(error);
    return context ? `${context}: ${message}` : message;
  },

  // Check if error is network related
  isNetworkError: (error) => {
    return !error?.response && error?.request;
  },

  // Check if error is server related
  isServerError: (error) => {
    return error?.response?.status >= 500;
  },

  // Check if error is client related
  isClientError: (error) => {
    const status = error?.response?.status;
    return status >= 400 && status < 500;
  },

  // Retry logic for failed requests
  shouldRetry: (error, retryCount = 0, maxRetries = 3) => {
    if (retryCount >= maxRetries) return false;
    
    // Retry on network errors or server errors
    return errorHandler?.isNetworkError(error) || errorHandler?.isServerError(error);
  },
};

// Toast notification helper (you can integrate with your preferred toast library)
export const showError = (error, context = '') => {
  const message = errorHandler?.formatErrorMessage(error, context);
  
  // For now, just console.error - replace with your toast implementation
  console.error('Error:', message);
  
  // Example integration with react-hot-toast:
  // import toast from 'react-hot-toast';
  // toast.error(message);
  
  return message;
};

export const showSuccess = (message) => {
  console.log('Success:', message);
  
  // Example integration with react-hot-toast:
  // import toast from 'react-hot-toast';
  // toast.success(message);
};

export default errorHandler;