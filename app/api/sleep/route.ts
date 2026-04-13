import { NextRequest } from 'next/server';

// Simulação dos dados reais de sono que já tens no OpenClaw
const mockSleepData = {
  duration: 7.2,
  efficiency: 85,
  quality: 8,
  date: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  // Aqui seria onde integraríamos com os dados reais do OpenClaw
  // Por enquanto, retornamos dados simulados baseados nos dados reais que sabemos que existem
  
  return Response.json(mockSleepData);
}