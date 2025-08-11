import { useState, useEffect } from 'react';

// Custom hook for API calls with loading, error, and data states
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiFunction();
        
        if (isMounted) {
          if (response?.success) {
            setData(response?.data);
          } else {
            setError(response?.error || 'An error occurred');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'An unexpected error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};

// Hook for mutations (POST, PUT, DELETE operations)
export const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (apiFunction, onSuccess = null, onError = null) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFunction();

      if (response?.success) {
        if (onSuccess) {
          onSuccess(response?.data);
        }
        return { success: true, data: response?.data };
      } else {
        const errorMessage = response?.error || 'Operation failed';
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred';
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setLoading(false);
  };

  return { mutate, loading, error, reset };
};

// Hook for paginated API calls
export const usePaginatedApi = (apiFunction, initialFilters = {}, initialPage = 1, initialLimit = 25) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const [limit, setLimit] = useState(initialLimit);

  const fetchData = async (page = currentPage, currentFilters = filters, currentLimit = limit) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFunction({
        ...currentFilters,
        page,
        limit: currentLimit,
      });

      if (response?.success) {
        setData(response?.data?.items || response?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
        setTotalItems(response?.data?.totalItems || 0);
      } else {
        setError(response?.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err?.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filters, limit]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const updatePage = (page) => {
    setCurrentPage(page);
  };

  const updateLimit = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when limit changes
  };

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    filters,
    limit,
    updateFilters,
    updatePage,
    updateLimit,
    refetch: () => fetchData(),
  };
};

export default { useApi, useMutation, usePaginatedApi };