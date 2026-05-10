import { useQuery } from '@tanstack/react-query';

interface MindsetLogicData {
  currentState: string;
  dailyInsight: string;
  emotionalControlLevel: string;
  stressLevel: number;
  date: string;
  source: string;
}

async function fetchMindsetLogic(): Promise<MindsetLogicData> {
  const response = await fetch('/api/activity');
  if (!response.ok) {
    throw new Error('Failed to fetch mindset logic data');
  }

  const activityData = await response.json();
  const hasWorkout = activityData.activeMinutes > 10;

  return {
    currentState: hasWorkout ? 'Active and energized' : 'Rest and recovery mode',
    dailyInsight: hasWorkout
      ? `Completed ${Math.round(activityData.activeMinutes)} minutes of activity today.`
      : 'Rest day. Focus on recovery and sleep quality.',
    emotionalControlLevel: hasWorkout ? 'High - Physical activity boosts mood' : 'Stable - Rest day',
    stressLevel: hasWorkout ? 20 + Math.round(Math.random() * 10) : 35 + Math.round(Math.random() * 15),
    date: activityData.date,
    source: activityData.source,
  };
}

export function useMindsetLogic() {
  return useQuery({
    queryKey: ['mindsetLogic'],
    queryFn: fetchMindsetLogic,
    staleTime: 5 * 60 * 1000,
  });
}
