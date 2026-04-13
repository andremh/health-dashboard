import { useQuery } from '@tanstack/react-query';
import { SupplementTracker } from '@/types/supplements';

interface BioFuelData {
  proteinIntake: number;
  creatineIntake: number;
  lastUpdated: string;
}

async function fetchBioFuel(): Promise<BioFuelData> {
  // Simulate API call - replace with actual API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        proteinIntake: 24,
        creatineIntake: 3,
        lastUpdated: new Date().toLocaleTimeString(),
      });
    }, 500);
  });
}

export function useBioFuel() {
  return useQuery({
    queryKey: ['bioFuel'],
    queryFn: fetchBioFuel,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}