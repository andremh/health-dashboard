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
  const response = await fetch('/api/activity');
  if (!response.ok) {
    throw new Error('Failed to fetch physical tracking data');
  }

  const activityData = await response.json();

  return {
    lastWorkout: {
      id: '1',
      date: activityData.date,
      activityType: 'Running',
      duration: activityData.activeMinutes,
      distance: activityData.distance,
      calories: activityData.calories,
    },
    thisWeekWorkouts: 3 + Math.round(Math.random() * 3),
    runningDistance: activityData.distance,
    gymSessions: 1 + Math.round(Math.random() * 2),
    steps: activityData.steps,
    calories: activityData.calories,
    distance: activityData.distance,
    activeMinutes: activityData.activeMinutes,
    date: activityData.date,
    source: activityData.source,
  };
}

export function usePhysicalTracking() {
  return useQuery({
    queryKey: ['physicalTracking'],
    queryFn: fetchPhysicalTracking,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
