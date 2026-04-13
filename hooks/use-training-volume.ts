import { useQuery } from '@tanstack/react-query';
import { TrainingVolume } from '@/types/training';

interface TrainingVolumeData {
  thisWeekVolume: number;
  lastWeekVolume: number;
  avgWeeklyVolume: number;
  maxWeeklyVolume: number;
  volumeTrend: 'increasing' | 'decreasing' | 'stable';
}

async function fetchTrainingVolume(): Promise<TrainingVolumeData> {
  // Simulate API call - replace with actual API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        thisWeekVolume: 1250,
        lastWeekVolume: 1180,
        avgWeeklyVolume: 1120,
        maxWeeklyVolume: 1500,
        volumeTrend: 'increasing',
      });
    }, 500);
  });
}

export function useTrainingVolume() {
  return useQuery({
    queryKey: ['trainingVolume'],
    queryFn: fetchTrainingVolume,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}