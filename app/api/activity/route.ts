import { NextRequest } from 'next/server';
import { fetchFitbitActivity } from '@/services/fitbit-service';

function getDateParam(request: NextRequest): string {
  return request.nextUrl.searchParams.get('date') || new Date().toISOString().split('T')[0];
}

export async function GET(request: NextRequest) {
  const date = getDateParam(request);

  try {
    const fitbitData = await fetchFitbitActivity(date);

    return Response.json({
      steps: fitbitData.steps,
      calories: fitbitData.calories,
      distance: fitbitData.distance,
      activeMinutes: fitbitData.activeMinutes,
      restingHeartRate: fitbitData.restingHeartRate,
      heartRateZones: fitbitData.heartRateZones || [],
      date,
      source: 'Fitbit',
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Activity API error:', error);

    // Fallback mock data
    return Response.json({
      steps: 8000,
      calories: 2000,
      distance: 6.2,
      activeMinutes: 45,
      date,
      source: 'fallback',
      fetchedAt: new Date().toISOString(),
    });
  }
}
