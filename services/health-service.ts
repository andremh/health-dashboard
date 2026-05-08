import { HealthMetric } from '@/types/health';
import { OpenClawIntegrationService } from './openclaw-integration';

class HealthService {
  async getLatestMetrics(): Promise<HealthMetric> {
    try {
      // Try to get real data from OpenClaw integration
      const data = await OpenClawIntegrationService.getHealthData();
      const latest = data[0];
      
      return {
        id: 'current',
        timestamp: new Date().toISOString(),
        heartRate: latest.resting_hr || 65,
        temperature: 36.5,
        hydration: 2.5,
        sleepHours: latest.duration_hours || 7,
        steps: latest.steps || 0,
        calories: latest.calories || 0,
        date: latest.date,
        source: latest.source,
      };
    } catch (error) {
      console.error('Error fetching health metrics:', error);
      // Return fallback data
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
      const data = await OpenClawIntegrationService.getHistoricalData(days);
      return data.map((item, index) => ({
        id: `hist-${index}`,
        timestamp: new Date(item.date).toISOString(),
        heartRate: item.resting_hr || 65,
        temperature: 36.5,
        hydration: 2.5,
        sleepHours: item.duration_hours || 7,
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
