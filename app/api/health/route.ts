import { NextRequest } from 'next/server';

// Simulação dos dados reais que já tens no OpenClaw
const mockHealthData = {
  heartRate: 62,
  temperature: 36.7,
  hydration: 85,
  sleepHours: 7.2,
  date: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  // Aqui seria onde integraríamos com os dados reais do OpenClaw
  // Por enquanto, retornamos dados simulados baseados nos dados reais que sabemos que existem
  
  return Response.json(mockHealthData);
}