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
}

async function fetchHealthMetrics(): Promise<HealthMetricsResponse> {
  // Chamada para a API real integrada com OpenClaw
  const response = await fetch('/api/integration/health');
  if (!response.ok) {
    const errorData = await response.json();
    console.error('API Error:', errorData);
    throw new Error(errorData.error || 'Failed to fetch health metrics');
  }
  return await response.json();
}

export function useHealthMetrics() {
  return useQuery({
    queryKey: ['healthMetrics'],
    queryFn: fetchHealthMetrics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}