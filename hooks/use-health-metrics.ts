import { useQuery } from '@tanstack/react-query';
import { HealthMetric } from '@/types/health';

interface HealthMetricsData {
  heartRate: number;
  temperature: number;
  hydration: number;
  sleepHours: number;
}

async function fetchHealthMetrics(): Promise<HealthMetricsData> {
  // Simulate API call - replace with actual API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        heartRate: 62,
        temperature: 36.7,
        hydration: 85,
        sleepHours: 7.2,
      });
    }, 500);
  });
}

export function useHealthMetrics() {
  return useQuery({
    queryKey: ['healthMetrics'],
    queryFn: fetchHealthMetrics,
    staleTime: 1 * 60 * 1000, // 1 minute (more frequent updates for health data)
  });
}