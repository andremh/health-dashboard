import { useQuery } from '@tanstack/react-query';

interface MindsetLogicData {
  currentState: string;
  dailyInsight: string;
  emotionalControlLevel: string;
  stressLevel: number;
  activityCount: number;
  heartRateZones: Record<string, number>;
  date: string;
  source: string;
}

async function fetchMindsetLogic(): Promise<MindsetLogicData> {
  const response = await fetch('/data/mindset-logic.json?' + Date.now());
  if (!response.ok) {
    throw new Error('Failed to fetch mindset logic data');
  }
  return await response.json();
}

export function useMindsetLogic() {
  return useQuery({
    queryKey: ['mindsetLogic'],
    queryFn: fetchMindsetLogic,
    staleTime: 5 * 60 * 1000,
  });
}
