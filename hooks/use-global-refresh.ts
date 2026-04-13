import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function useGlobalRefresh() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Invalidate all queries to trigger refetch
      await queryClient.invalidateQueries();
    } catch (error) {
      console.error('Error during global refresh:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleRefresh,
  };
}