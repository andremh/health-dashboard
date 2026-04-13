import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useErrorHandler } from '@/providers/error-handler-context';

export function useGlobalRefreshEnhanced() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { addError, addWarning } = useErrorHandler();

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Invalidate all queries to trigger refetch
      await queryClient.invalidateQueries();
      
      // Add success notification
      addWarning('All data refreshed successfully', 'Global Refresh');
    } catch (error) {
      console.error('Error during global refresh:', error);
      addError(`Global refresh failed: ${(error as Error).message}`, 'Global Refresh');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleRefresh,
  };
}