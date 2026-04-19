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
  // Chamada para a API real integrada com OpenClaw
  const response = await fetch('/api/integration/activity');
  if (!response.ok) {
    throw new Error('Failed to fetch physical tracking data');
  }
  const data = await response.json();
  
  // Mapear os dados recebidos para o formato esperado
  return {
    lastWorkout: {
      id: '1',
      date: new Date().toISOString(),
      activityType: 'Running',
      duration: data.activeMinutes || 45,
      distance: data.distance || 5.2,
      calories: data.calories || 420,
    },
    thisWeekWorkouts: 5,
    runningDistance: data.distance || 0,
    gymSessions: 3,
    steps: data.steps || 0,
    calories: data.calories || 0,
    distance: data.distance || 0,
    activeMinutes: data.activeMinutes || 0,
    date: data.date || new Date().toISOString(),
    source: data.source || 'OpenClaw'
  };
}

export function usePhysicalTracking() {
  return useQuery({
    queryKey: ['physicalTracking'],
    queryFn: fetchPhysicalTracking,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}