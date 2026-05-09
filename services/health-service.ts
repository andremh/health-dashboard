import { HealthMetric } from '@/types/health';

// API URL - usa NEXT_PUBLIC_ para estar disponível no browser
const HEALTH_API_URL = process.env.NEXT_PUBLIC_HEALTH_API_URL || 'http://localhost:8080';

class HealthService {
  async getLatestMetrics(): Promise<HealthMetric> {
    try {
      const response = await fetch(`${HEALTH_API_URL}/api/health/today`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const result = await response.json();
      const data = result.data;
      
      return {
        id: 'current',
        timestamp: new Date().toISOString(),
        heartRate: data.resting_hr || 65,
        temperature: 36.5,
        hydration: 2.5,
        sleepHours: 7, // Will be fetched separately
        steps: data.steps || 0,
        calories: data.calories || 0,
        date: data.date,
        source: data.source,
      };
    } catch (error) {
      console.error('Error fetching health metrics:', error);
      return {
        id: 'fallback',
        timestamp: new Date().toISOString(),
        heartRate: 65,
        temperature: 36.5,
        hydration: 2.5,
        sleepHours: 7,
        steps: 8547,
        calories: 420,
        date: new Date().toISOString(),
        source: 'fallback',
      };
    }
  }

  async getHistoricalMetrics(days: number = 7): Promise<HealthMetric[]> {
    try {
      const response = await fetch(`${HEALTH_API_URL}/api/health/historical?days=${days}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const result = await response.json();
      return result.data.map((item: any, index: number) => ({
        id: `hist-${index}`,
        timestamp: new Date(item.date).toISOString(),
        heartRate: item.resting_hr || 65,
        temperature: 36.5,
        hydration: 2.5,
        sleepHours: 7,
        steps: item.steps || 0,
        calories: item.calories || 0,
        date: item.date,
        source: item.source,
      }));
    } catch (error) {
      console.error('Error fetching historical health metrics:', error);
      return [];
    }
  }

  async updateMetrics(metric: Partial<HealthMetric>): Promise<HealthMetric> {
    // For now, just return the metric as-is (read-only from OpenClaw)
    return {
      id: 'manual',
      timestamp: new Date().toISOString(),
      heartRate: metric.heartRate || 65,
      temperature: metric.temperature || 36.5,
      hydration: metric.hydration || 2.5,
      sleepHours: metric.sleepHours || 7,
      steps: metric.steps || 0,
      calories: metric.calories || 0,
      date: new Date().toISOString(),
      source: 'manual',
    };
  }
}

export const healthService = new HealthService();
