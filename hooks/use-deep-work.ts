import { useQuery } from '@tanstack/react-query';
import { FocusTime } from '@/types/productivity';

interface DeepWorkData {
  focusTime: number;
  recoveryTime: number;
  focusPercentage: number;
  recoveryPercentage: number;
  productivityScore: number;
}

async function fetchDeepWork(): Promise<DeepWorkData> {
  // Simulate API call - replace with actual API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        focusTime: 240,
        recoveryTime: 180,
        focusPercentage: 57,
        recoveryPercentage: 43,
        productivityScore: 85,
      });
    }, 500);
  });
}

export function useDeepWork() {
  return useQuery({
    queryKey: ['deepWork'],
    queryFn: fetchDeepWork,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}