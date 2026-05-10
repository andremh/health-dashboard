/**
 * Fitbit API Service
 * Fetches real health data from Fitbit using the user's OAuth tokens.
 */
import fs from 'fs';
import path from 'path';

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
}

interface FitbitTokens {
  accessToken: string;
  refreshToken: string;
  clientId: string;
  clientSecret: string;
}

const FITBIT_API_BASE = 'https://api.fitbit.com/1/user/-';
const HERMES_ENV_PATH = '/root/.hermes/.env';

/**
 * Reads Fitbit tokens from the Hermes .env file first,
 * falling back to Next.js process.env.
 */
function getTokens(): FitbitTokens {
  try {
    if (fs.existsSync(HERMES_ENV_PATH)) {
      const envContent = fs.readFileSync(HERMES_ENV_PATH, 'utf-8');
      const accessMatch = envContent.match(/FITBIT_ACCESS_TOKEN=(.+)/);
      const refreshMatch = envContent.match(/FITBIT_REFRESH_TOKEN=(.+)/);
      const clientMatch = envContent.match(/FITBIT_CLIENT_ID=(.+)/);
      const secretMatch = envContent.match(/FITBIT_CLIENT_SECRET=(.+)/);

      return {
        accessToken: accessMatch?.[1]?.trim() || process.env.FITBIT_ACCESS_TOKEN || '',
        refreshToken: refreshMatch?.[1]?.trim() || process.env.FITBIT_REFRESH_TOKEN || '',
        clientId: clientMatch?.[1]?.trim() || process.env.FITBIT_CLIENT_ID || '',
        clientSecret: secretMatch?.[1]?.trim() || process.env.FITBIT_CLIENT_SECRET || '',
      };
    }
  } catch {
    // Fall through to process.env
  }

  return {
    accessToken: process.env.FITBIT_ACCESS_TOKEN || '',
    refreshToken: process.env.FITBIT_REFRESH_TOKEN || '',
    clientId: process.env.FITBIT_CLIENT_ID || '',
    clientSecret: process.env.FITBIT_CLIENT_SECRET || '',
  };
}

/**
 * Calls the Fitbit API with the current access token.
 * If it fails with 401, attempts token refresh.
 */
async function fitbitFetch(path: string): Promise<Response> {
  const { accessToken, clientId, clientSecret } = getTokens();

  const url = `${FITBIT_API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 401) {
    const body = await res.text().catch(() => '(no body)');
    console.error(`[fitbit] 401 on ${path}: ${body.substring(0, 200)}`);

    // Try to refresh the token
    try {
      const { refreshToken } = getTokens();
      if (refreshToken && refreshToken.length > 10 && !refreshToken.includes('...')) {
        console.log('[fitbit] Attempting token refresh...');
        const refreshRes = await fetch('https://api.fitbit.com/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          }),
        });
        if (refreshRes.ok) {
          const tokens = await refreshRes.json();
          console.log('[fitbit] Token refreshed!');
          // Update the env for subsequent calls in this process
          const currentEnv = fs.readFileSync(HERMES_ENV_PATH, 'utf-8');
          const updatedEnv = currentEnv.replace(
            /FITBIT_ACCESS_TOKEN=.+/,
            `FITBIT_ACCESS_TOKEN=${tokens.access_token}`
          );
          fs.writeFileSync(HERMES_ENV_PATH, updatedEnv);

          // Retry with new token
          const retryRes = await fetch(url, {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          });
          return retryRes;
        } else {
          const errBody = await refreshRes.text();
          console.error(`[fitbit] Token refresh failed: ${refreshRes.status} ${errBody.substring(0, 200)}`);
        }
      }
    } catch (refreshError) {
      console.error('[fitbit] Token refresh error:', refreshError);
    }

    throw new Error('Fitbit token expired — needs refresh token renewal');
  }

  return res;
}

export async function fetchFitbitActivity(date: string): Promise<FitbitActivity> {
  try {
    const [activitiesRes, heartRes, sleepRes, bodyRes] = await Promise.all([
      fitbitFetch(`/activities/date/${date}.json`),
      fitbitFetch(`/activities/heart/date/${date}/1d.json`).catch(() => null),
      fitbitFetch(`/sleep/date/${date}.json`).catch(() => null),
      fitbitFetch(`/body/date/${date}.json`).catch(() => null),
    ]);

    if (!activitiesRes.ok) {
      throw new Error(`Fitbit API error: ${activitiesRes.status}`);
    }

    const activitiesData = await activitiesRes.json();
    const summary = activitiesData.summary || {};

    // Heart rate data
    let restingHeartRate: number | undefined;
    let heartRateZones: Array<{ name: string; minutes: number }> = [];
    if (heartRes && heartRes.ok) {
      const heartData = await heartRes.json();
      const heartVal = heartData['activities-heart']?.[0]?.value || {};
      restingHeartRate = heartVal.restingHeartRate;
      heartRateZones = (heartVal.heartRateZones || [])
        .filter((z: any) => (z.minutes || 0) > 0)
        .map((z: any) => ({ name: z.name, minutes: z.minutes }));
    }

    // Sleep data
    let sleepHours = 0;
    let sleepEfficiency = 0;
    if (sleepRes && sleepRes.ok) {
      const sleepData = await sleepRes.json();
      sleepHours = (sleepData.summary?.totalMinutesAsleep || 0) / 60;
      sleepEfficiency = sleepData.summary?.efficiency || 0;
    }

    // Body data
    let weight: number | undefined;
    if (bodyRes && bodyRes.ok) {
      const bodyData = await bodyRes.json();
      weight = bodyData.body?.weight > 0 ? bodyData.body.weight : undefined;
    }

    return {
      steps: summary.steps || 0,
      calories: summary.caloriesOut || 0,
      distance: summary.distances?.[0]?.distance || 0,
      activeMinutes: (summary.fairlyActiveMinutes || 0) + (summary.veryActiveMinutes || 0),
      restingHeartRate,
      heartRateZones,
      sleepHours,
      sleepEfficiency,
      weight,
    };
  } catch (error) {
    console.error('Error fetching Fitbit data:', error);
    throw error;
  }
}
