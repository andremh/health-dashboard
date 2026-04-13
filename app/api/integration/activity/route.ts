import { NextRequest } from 'next/server';
import { OpenClawIntegrationService } from '@/services/openclaw-integration';

export async function GET(request: NextRequest) {
  try {
    const healthData = await OpenClawIntegrationService.getHealthData();
    
    if (healthData && healthData.length > 0) {
      const latestData = healthData[0];
      
      return Response.json({
        steps: latestData.steps,
        calories: latestData.calories,
        distance: Math.round((latestData.steps / 1300) * 100) / 100, // Conversão aproximada: 1300 passos = 1km
        activeMinutes: Math.round(latestData.calories / 8), // Aproximação: 8 calorias por minuto ativo
        date: latestData.date,
        source: latestData.source
      });
    } else {
      // Retorna valores padrão se não houver dados
      return Response.json({
        steps: 8547,
        calories: 420,
        distance: 6.2,
        activeMinutes: 52,
        date: new Date().toISOString(),
        source: 'default'
      });
    }
  } catch (error) {
    console.error('Error in activity API:', error);
    return Response.json(
      {
        error: 'Failed to fetch activity data from OpenClaw',
        fallbackData: {
          steps: 8547,
          calories: 420,
          distance: 6.2,
          activeMinutes: 52,
          date: new Date().toISOString(),
          source: 'fallback'
        }
      },
      { status: 500 }
    );
  }
}