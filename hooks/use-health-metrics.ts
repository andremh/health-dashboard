import { useQuery } from '@tanstack/react-query';

interface HealthMetricsResponse {
  heartRate: number;
  temperature: number;
  hydration: number;
  sleepHours: number;
  steps: number;
  calories: number;
  date: string;
  source: string;
  fetchedAt?: string;
}

async function fetchHealthMetrics(): Promise<HealthMetricsResponse> {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error('Failed to fetch health metrics');
  }
  return await response.json();
}

export function useHealthMetrics() {
  return useQuery({
    queryKey: ['healthMetrics'],
    queryFn: fetchHealthMetrics,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
