import { useQuery } from '@tanstack/react-query';
import { SupplementTracker } from '@/types/supplements';

interface BioFuelResponse {
  proteinIntake: number;
  creatineIntake: number;
  lastUpdated: string;
  date: string;
}

async function fetchBioFuel(): Promise<BioFuelResponse> {
  // Chamada para a API real
  const response = await fetch('/api/supplements');
  if (!response.ok) {
    throw new Error('Failed to fetch bio fuel data');
  }
  return await response.json();
}

export function useBioFuel() {
  return useQuery({
    queryKey: ['bioFuel'],
    queryFn: fetchBioFuel,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}