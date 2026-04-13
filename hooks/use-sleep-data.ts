import { useQuery } from '@tanstack/react-query';

interface SleepData {
  duration: number;
  efficiency: number;
  quality: number;
  date: string;
}

async function fetchSleepData(): Promise<SleepData> {
  // Chamada para a API real
  const response = await fetch('/api/sleep');
  if (!response.ok) {
    throw new Error('Failed to fetch sleep data');
  }
  return await response.json();
}

export function useSleepData() {
  return useQuery({
    queryKey: ['sleepData'],
    queryFn: fetchSleepData,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}