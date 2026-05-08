import { useQuery } from '@tanstack/react-query';
import { RunningActivity } from '@/types/activities';

interface PhysicalTrackingResponse {
  lastWorkout: RunningActivity | null;
  thisWeekWorkouts: number;
  runningDistance: number;
  gymSessions: number;
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  date: string;
  source: string;
}

async function fetchPhysicalTracking(): Promise<PhysicalTrackingResponse> {
  // Fetch static JSON generated during build
  const response = await fetch('/data/physical-data.json?' + Date.now());
  if (!response.ok) {
    throw new Error('Failed to fetch physical tracking data');
  }
  return await response.json();
}

export function usePhysicalTracking() {
  return useQuery({
    queryKey: ['physicalTracking'],
    queryFn: fetchPhysicalTracking,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
