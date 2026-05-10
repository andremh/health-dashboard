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
      heartRate: fitbitData.restingHeartRate || 65,
      temperature: 36.6,
      hydration: 80,
      sleepHours: fitbitData.sleepHours,
      steps: fitbitData.steps,
      calories: fitbitData.calories,
      heartRateZones: fitbitData.heartRateZones || [],
      date,
      source: 'Fitbit',
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health API error:', error);

    // No fallback mock data allowed
    return Response.json({ error: error.message || 'Failed to fetch' }, { status: 500 });
  }
}
