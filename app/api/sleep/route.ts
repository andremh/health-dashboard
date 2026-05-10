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
      duration: fitbitData.sleepHours,
      efficiency: fitbitData.sleepEfficiency,
      quality: fitbitData.sleepEfficiency > 0 ? Math.round(fitbitData.sleepEfficiency / 10) : 5,
      date,
      source: 'Fitbit',
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Sleep API error:', error);

    return Response.json({
      duration: 7.0,
      efficiency: 80,
      quality: 7,
      date,
      source: 'fallback',
      fetchedAt: new Date().toISOString(),
    });
  }
}
