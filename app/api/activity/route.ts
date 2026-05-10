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
      source: fitbitData.source || 'Fitbit',
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Activity API error:', error);

    // No fallback mock data allowed
    return Response.json({ error: error instanceof Error ? error.message : 'Failed to fetch' }, { status: 500 });
  }
}
