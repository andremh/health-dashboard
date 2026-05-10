import { useQuery } from '@tanstack/react-query';

interface BioFuelResponse {
  proteinIntake: number;
  targetProtein?: number;
  creatineIntake: number;
  targetCreatine?: number;
  lastUpdated: string;
  date: string;
}

async function fetchBioFuel(): Promise<BioFuelResponse> {
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
    staleTime: 5 * 60 * 1000,
  });
}
