import { NextRequest } from 'next/server';
import { OpenClawIntegrationService } from '@/services/openclaw-integration';

export async function GET(request: NextRequest) {
  try {
    const healthData = await OpenClawIntegrationService.getHealthData();
    
    if (healthData && healthData.length > 0) {
      const latestData = healthData[0];
      
      return Response.json({
        heartRate: latestData.resting_hr || latestData.avg_hr || 62,
        temperature: 36.7, // Valor padrão, pois não está disponível no script
        hydration: 85, // Valor padrão, pois não está disponível no script
        sleepHours: latestData.duration_hours || 7.2,
        steps: latestData.steps,
        calories: latestData.calories,
        date: latestData.date,
        source: latestData.source
      });
    } else {
      // Retorna valores padrão se não houver dados
      return Response.json({
        heartRate: 62,
        temperature: 36.7,
        hydration: 85,
        sleepHours: 7.2,
        steps: 8547,
        calories: 420,
        date: new Date().toISOString(),
        source: 'default'
      });
    }
  } catch (error) {
    console.error('Error in health API:', error);
    return Response.json(
      {
        error: 'Failed to fetch health data from OpenClaw',
        fallbackData: {
          heartRate: 62,
          temperature: 36.7,
          hydration: 85,
          sleepHours: 7.2,
          steps: 8547,
          calories: 420,
          date: new Date().toISOString(),
          source: 'fallback'
        }
      },
      { status: 500 }
    );
  }
}