import { useQuery } from '@tanstack/react-query';

interface DeepWorkData {
  focusTime: number;
  recoveryTime: number;
  focusPercentage: number;
  recoveryPercentage: number;
  productivityScore: number;
  date: string;
  source: string;
}

async function fetchDeepWork(): Promise<DeepWorkData> {
  const response = await fetch('/api/activity');
  if (!response.ok) {
    throw new Error('Failed to fetch deep work data');
  }

  const activityData = await response.json();
  const focusTime = activityData.activeMinutes || 45;
  const recoveryTime = Math.max(0, 480 - focusTime);
  const totalTime = focusTime + recoveryTime;

  return {
    focusTime,
    recoveryTime,
    focusPercentage: totalTime > 0 ? Math.round((focusTime / totalTime) * 100) : 0,
    recoveryPercentage: totalTime > 0 ? Math.round((recoveryTime / totalTime) * 100) : 100,
    productivityScore: focusTime > 60 ? 85 : focusTime > 30 ? 60 : 30,
    date: activityData.date,
    source: activityData.source,
  };
}

export function useDeepWork() {
  return useQuery({
    queryKey: ['deepWork'],
    queryFn: fetchDeepWork,
    staleTime: 5 * 60 * 1000,
  });
}
