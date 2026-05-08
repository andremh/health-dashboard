import { useQuery } from '@tanstack/react-query';

interface DeepWorkData {
  focusTime: number;
  recoveryTime: number;
  focusPercentage: number;
  recoveryPercentage: number;
  productivityScore: number;
  activities: Array<{
    name: string;
    duration: number;
    calories: number;
  }>;
  date: string;
  source: string;
}

async function fetchDeepWork(): Promise<DeepWorkData> {
  const response = await fetch('/data/deep-work.json?' + Date.now());
  if (!response.ok) {
    throw new Error('Failed to fetch deep work data');
  }
  return await response.json();
}

export function useDeepWork() {
  return useQuery({
    queryKey: ['deepWork'],
    queryFn: fetchDeepWork,
    staleTime: 5 * 60 * 1000,
  });
}
