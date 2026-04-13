import { NextRequest } from 'next/server';

// Simulação dos dados reais de atividade que já tens no OpenClaw
const mockActivityData = {
  steps: 8547,
  calories: 420,
  distance: 6.2,
  activeMinutes: 45,
  date: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  // Aqui seria onde integraríamos com os dados reais do OpenClaw
  // Por enquanto, retornamos dados simulados baseados nos dados reais que sabemos que existem
  
  return Response.json(mockActivityData);
}