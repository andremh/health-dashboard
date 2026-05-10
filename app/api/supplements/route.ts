import { NextRequest } from 'next/server';

function generateSupplementsData() {
  const now = new Date();
  return {
    proteinIntake: 15 + Math.round(Math.random() * 20), // 15-35g
    targetProtein: 30,
    creatineIntake: 2 + Math.round(Math.random() * 2), // 2-4g
    targetCreatine: 3,
    lastUpdated: now.toISOString(),
    date: now.toISOString().split('T')[0],
  };
}

export async function GET(_request: NextRequest) {
  return Response.json(generateSupplementsData());
}
