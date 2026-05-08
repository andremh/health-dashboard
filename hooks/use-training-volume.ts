import { useQuery } from '@tanstack/react-query';

interface TrainingVolumeData {
  thisWeekVolume: number;
  lastWeekVolume: number;
  avgWeeklyVolume: number;
  maxWeeklyVolume: number;
  volumeTrend: 'increasing' | 'decreasing' | 'stable';
  activities: Array<{
    name: string;
    duration: number;
    calories: number;
  }>;
  heartRateZones: Record<string, number>;
  date: string;
  source: string;
}

async function fetchTrainingVolume(): Promise<TrainingVolumeData> {
  const response = await fetch('/data/training-volume.json?' + Date.now());
  if (!response.ok) {
    throw new Error('Failed to fetch training volume data');
  }
  return await response.json();
}

export function useTrainingVolume() {
  return useQuery({
    queryKey: ['trainingVolume'],
    queryFn: fetchTrainingVolume,
    staleTime: 5 * 60 * 1000,
  });
}
