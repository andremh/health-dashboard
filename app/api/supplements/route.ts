import { NextRequest } from 'next/server';

// Simulação dos dados reais de suplementos que já tens no OpenClaw
const mockSupplementsData = {
  proteinIntake: 24,
  creatineIntake: 3,
  lastUpdated: new Date().toISOString(),
  date: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  // Aqui seria onde integraríamos com os dados reais do OpenClaw
  // Por enquanto, retornamos dados simulados baseados nos dados reais que sabemos que existem
  
  return Response.json(mockSupplementsData);
}