import { useQuery } from '@tanstack/react-query';
import { RunningActivity } from '@/types/activities';

interface PhysicalTrackingResponse {
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  date: string;
  source: string;
}

async function fetchPhysicalTracking(): Promise<PhysicalTrackingResponse> {
  // Chamada para a API real integrada com OpenClaw
  const response = await fetch('/api/integration/activity');
  if (!response.ok) {
    throw new Error('Failed to fetch physical tracking data');
  }
  return await response.json();
}

export function usePhysicalTracking() {
  return useQuery({
    queryKey: ['physicalTracking'],
    queryFn: fetchPhysicalTracking,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}