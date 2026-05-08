import { useQuery } from '@tanstack/react-query';

interface BioFuelResponse {
  proteinIntake: number;
  creatineIntake: number;
  lastUpdated: string;
  date: string;
}

async function fetchBioFuel(): Promise<BioFuelResponse> {
  // Fetch static JSON generated during build
  const response = await fetch('/data/biofuel-data.json?' + Date.now());
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
