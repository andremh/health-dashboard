'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState, useCallback, useEffect, useRef } from 'react';

export function useGlobalRefresh() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showMessage = useCallback((text: string, type: 'success' | 'error') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessage({ text, type });
    timerRef.current = setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      await queryClient.invalidateQueries({ refetchType: 'active' });
      showMessage('✓ Dados atualizados', 'success');
    } catch {
      showMessage('✗ Erro ao atualizar', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [queryClient, showMessage]);

  return {
    isLoading,
    message,
    handleRefresh,
  };
}
