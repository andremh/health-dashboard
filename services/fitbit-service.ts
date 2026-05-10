/**
 * Fitbit API Service
 * Fetches health data via the VPS gateway instead of calling Fitbit directly.
 */

interface FitbitActivity {
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  restingHeartRate?: number;
  heartRateZones?: Array<{ name: string; minutes: number }>;
  sleepHours: number;
  sleepEfficiency: number;
  weight?: number;
  source?: string;
}

const VPS_GATEWAY_URL = process.env.VPS_GATEWAY_URL || "http://188.245.86.102:3001";
const VPS_API_KEY = process.env.VPS_API_KEY || "";

export async function fetchFitbitActivity(date: string, source?: string): Promise<FitbitActivity> {
  try {
    const url = `${VPS_GATEWAY_URL}/api/metrics?api_key=${VPS_API_KEY}&date=${date}${source ? `&source=${source}` : ''}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`VPS gateway error: ${res.status} ${res.statusText}`);
    }

    const response = await res.json();

    return {
      steps: response.steps?.value ?? 0,
      calories: response.calories?.value ?? 0,
      distance: response.distance?.value ?? 0,
      activeMinutes: response.activeMinutes?.value ?? 0,
      restingHeartRate: response.heartRate?.value ?? undefined,
      heartRateZones: response.heartRateZones?.value ?? undefined,
      sleepHours: response.sleepHours?.value ?? 0,
      sleepEfficiency: response.sleepEfficiency?.value ?? 0,
      weight: response.weight?.value ?? undefined,
      source: response.source,
    };
  } catch (error) {
    console.error('Error fetching health data from VPS gateway:', error);
    throw error;
  }
}
