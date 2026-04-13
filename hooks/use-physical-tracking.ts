import { useQuery } from '@tanstack/react-query';
import { RunningActivity } from '@/types/activities';

interface PhysicalTrackingData {
  lastWorkout: RunningActivity | null;
  thisWeekWorkouts: number;
  runningDistance: number;
  gymSessions: number;
}

async function fetchPhysicalTracking(): Promise<PhysicalTrackingData> {
  // Simulate API call - replace with actual API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        lastWorkout: {
          id: '1',
          date: new Date().toISOString(),
          activityType: 'Running',
          duration: 45,
          distance: 8.5,
          calories: 620,
        },
        thisWeekWorkouts: 5,
        runningDistance: 32.5,
        gymSessions: 3,
      });
    }, 500);
  });
}

export function usePhysicalTracking() {
  return useQuery({
    queryKey: ['physicalTracking'],
    queryFn: fetchPhysicalTracking,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}