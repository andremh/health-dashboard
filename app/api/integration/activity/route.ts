import { NextRequest } from 'next/server';
import { fetchFitbitActivity } from '@/services/fitbit-service';

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date') || new Date().toISOString().split('T')[0];

  try {
    const data = await fetchFitbitActivity(date);
    return Response.json({
      steps: data.steps,
      calories: data.calories,
      distance: data.distance,
      activeMinutes: data.activeMinutes,
      date,
      source: 'Fitbit',
    });
  } catch {
    return Response.json({ error: 'Fitbit API unavailable' }, { status: 503 });
  }
}
